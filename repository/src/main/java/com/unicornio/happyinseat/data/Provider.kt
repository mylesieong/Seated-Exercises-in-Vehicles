package com.unicornio.happyinseat.data

import android.content.*
import android.database.Cursor
import android.net.Uri
import android.util.Log
import com.unicornio.happyinseat.database.ExerciseRecord
import com.unicornio.happyinseat.database.MyDatabase
import com.unicornio.happyinseat.database.MyDatabase.Companion.getInstance

class Provider : ContentProvider() {
    private lateinit var db: MyDatabase

    override fun onCreate(): Boolean {
        context?.let {
            db = getInstance(it)
        }
        return true
    }

    override fun query(uri: Uri, projection: Array<String>?, selection: String?, selectionArgs: Array<String>?, sortOrder: String?): Cursor? {
        val cursor = when (sUriMatcher.match(uri)) {
            RECORD_ALL -> toCursor(db.exerciseDao().getAll())
            else -> throw IllegalArgumentException("Cannot query unknown URI $uri")
        }
        cursor?.setNotificationUri(context?.contentResolver, uri)
        return cursor
    }

    override fun insert(uri: Uri, contentValues: ContentValues?): Uri? {
        fun insertRecord(uri: Uri, values: ContentValues?): Uri? {
            Log.d(TAG, " insertRecord: uri=$uri, values=$values")

            if (values == null || !isValidForInsertion(values)) {
                Log.w(TAG, " insertRecord: values not valid")
                return null
            }

            val recordToInsert: ExerciseRecord = fromContentValues(values) ?: throw IllegalArgumentException("fromContentValues failed to return ExerciseRecord from $values")
            val id = db.exerciseDao().insert(recordToInsert)

            return if (id == -1L) {
                Log.e(TAG, "Failed to insert row for $uri")
                null

            } else {
                context?.contentResolver?.notifyChange(uri, null)
                ContentUris.withAppendedId(uri, id)
            }
        }

        return when (sUriMatcher.match(uri)) {
            RECORD_ALL -> insertRecord(uri, contentValues)
            else -> throw IllegalArgumentException("Insertion is not supported for $uri")
        }
    }

    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<String>?): Int {
        throw IllegalArgumentException("Update is not supported for $uri")
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<String>?): Int {
        val rowsDeleted: Int = when (sUriMatcher.match(uri)) {
            RECORD_ALL -> db.exerciseDao().delete()
            else -> throw IllegalArgumentException("Deletion is not supported for $uri")
        }

        context?.contentResolver?.notifyChange(uri, null)
        return rowsDeleted
    }

    override fun getType(uri: Uri): String {
        return when (val match = sUriMatcher.match(uri)) {
            RECORD_ALL -> "${ContentResolver.CURSOR_DIR_BASE_TYPE}/$CONTENT_AUTHORITY/${com.unicornio.happyinseat.database.TABLE_NAME}"
            RECORD_BY_ID -> "${ContentResolver.CURSOR_ITEM_BASE_TYPE}/$CONTENT_AUTHORITY/${com.unicornio.happyinseat.database.TABLE_NAME}"
            else -> throw IllegalStateException("Unknown URI $uri with match $match")
        }
    }

    companion object {
        val TAG = Provider::class.java.simpleName
        private const val RECORD_ALL = 100
        private const val RECORD_BY_ID = 101

        private val sUriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
            addURI(CONTENT_AUTHORITY, com.unicornio.happyinseat.database.TABLE_NAME, RECORD_ALL)
            addURI(CONTENT_AUTHORITY, "${com.unicornio.happyinseat.database.TABLE_NAME}/#", RECORD_BY_ID)
        }

        private const val CONTENT_AUTHORITY = "com.unicornio.happyinseat"
        private val BASE_CONTENT_URI: Uri = Uri.parse("content://${CONTENT_AUTHORITY}")

        val RECORDS_CONTENT_URI: Uri = Uri.withAppendedPath(BASE_CONTENT_URI, com.unicornio.happyinseat.database.TABLE_NAME)
    }
}
