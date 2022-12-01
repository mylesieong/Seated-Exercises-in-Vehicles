package com.unicornio.happyinseat.data

import android.content.ContentProvider
import android.content.ContentUris
import android.content.ContentValues
import android.content.UriMatcher
import android.database.Cursor
import android.net.Uri
import android.util.Log
import com.unicornio.happyinseat.data.Contract.RecordEntry
import com.unicornio.happyinseat.data.Contract.RecordEntry.isValidForInsertion
import com.unicornio.happyinseat.data.Contract.RecordEntry.isValidForUpdate

class Provider : ContentProvider() {

    private var mDbHelper: DbHelper? = null
    override fun onCreate(): Boolean {
        mDbHelper = DbHelper(context)
        return true
    }

    override fun query(uri: Uri, projection: Array<String>?, selection: String?, selectionArgs: Array<String>?, sortOrder: String?): Cursor? {
        val database = mDbHelper?.readableDatabase
        val cursor = when (sUriMatcher.match(uri)) {
            RECORD_ALL -> database?.query(
                RecordEntry.TABLE_NAME, projection, selection, selectionArgs, null, null, sortOrder
            )
            RECORD_BY_ID -> database?.query(
                RecordEntry.TABLE_NAME, projection, RecordEntry.ID + "=?", arrayOf(ContentUris.parseId(uri).toString()), null, null, sortOrder
            )
            else -> throw IllegalArgumentException("Cannot query unknown URI $uri")
        }
        cursor?.setNotificationUri(context?.contentResolver, uri)
        return cursor
    }

    override fun insert(uri: Uri, contentValues: ContentValues?): Uri? = when (sUriMatcher.match(uri)) {
        RECORD_ALL -> insertRecord(uri, contentValues)
        else -> throw IllegalArgumentException("Insertion is not supported for $uri")
    }

    private fun insertRecord(uri: Uri, values: ContentValues?): Uri? {
        Log.d(TAG, " insertRecord: uri=$uri, values=$values")

        if (values == null || !isValidForInsertion(values)) {
            Log.w(TAG, " insertRecord: values not valid")
            return null
        }

        val database = mDbHelper?.writableDatabase
        val id = database?.insert(RecordEntry.TABLE_NAME, null, values)
        if (id == null || id == -1L) {
            Log.e(TAG, "Failed to insert row for $uri")
            return null
        }

        context?.contentResolver?.notifyChange(uri, null)
        return ContentUris.withAppendedId(uri, id)
    }

    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<String>?): Int = when (sUriMatcher.match(uri)) {
        RECORD_ALL -> updateRecord(uri, values, selection, selectionArgs)
        RECORD_BY_ID -> updateRecord(uri, values, RecordEntry.ID + "=?", arrayOf(ContentUris.parseId(uri).toString()))
        else -> throw IllegalArgumentException("Update is not supported for $uri")
    }

    private fun updateRecord(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<String>?): Int {
        Log.d(TAG, " updateRecord: uri=$uri, values=$values, selection=$selection, selectionArgs=$selectionArgs")

        if (values == null || !isValidForUpdate(values)) {
            Log.w(TAG, " updateRecord: values not valid")
            return 0
        }

        val database = mDbHelper?.writableDatabase
        val rowsUpdated = database?.update(RecordEntry.TABLE_NAME, values, selection, selectionArgs)

        if (rowsUpdated != null && rowsUpdated > 0) {
            context?.contentResolver?.notifyChange(uri, null)
        }

        return rowsUpdated
            ?: 0
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<String>?): Int {
        var selection = selection
        var selectionArgs = selectionArgs
        val database = mDbHelper?.writableDatabase
        val rowsDeleted: Int?
        when (sUriMatcher.match(uri)) {
            RECORD_ALL -> rowsDeleted = database?.delete(RecordEntry.TABLE_NAME, selection, selectionArgs)
            RECORD_BY_ID -> {
                selection = RecordEntry.ID + "=?"
                selectionArgs = arrayOf(ContentUris.parseId(uri).toString())
                rowsDeleted = database?.delete(RecordEntry.TABLE_NAME, selection, selectionArgs)
            }
            else -> throw IllegalArgumentException("Deletion is not supported for $uri")
        }

        if (rowsDeleted == null || rowsDeleted == 0) {
            return 0
        }
        context?.contentResolver?.notifyChange(uri, null)
        return rowsDeleted
    }

    override fun getType(uri: Uri): String? {
        return when (val match = sUriMatcher.match(uri)) {
            RECORD_ALL -> RecordEntry.CONTENT_LIST_TYPE
            RECORD_BY_ID -> RecordEntry.CONTENT_ITEM_TYPE
            else -> throw IllegalStateException("Unknown URI $uri with match $match")
        }
    }

    companion object {
        val TAG = Provider::class.java.simpleName
        private const val RECORD_ALL = 100
        private const val RECORD_BY_ID = 101
        private val sUriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
            addURI(Contract.CONTENT_AUTHORITY, RecordEntry.TABLE_NAME, RECORD_ALL)
            addURI(Contract.CONTENT_AUTHORITY, "${RecordEntry.TABLE_NAME}/#", RECORD_BY_ID)
        }
    }
}
