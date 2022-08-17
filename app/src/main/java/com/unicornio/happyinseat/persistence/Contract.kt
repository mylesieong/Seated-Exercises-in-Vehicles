package com.unicornio.happyinseat.persistence

import android.content.ContentResolver
import android.content.ContentValues
import android.database.Cursor
import android.net.Uri
import android.provider.BaseColumns
import android.util.Log
import com.unicornio.happyinseat.Record
import com.unicornio.happyinseat.STANDARD_STRETCH

/*
* This class is an informational class for the database tables, it should not be changed or instantiated at runtime.
*/
object Contract {
    const val CONTENT_AUTHORITY = "com.unicornio.happyinseat"

    val BASE_CONTENT_URI: Uri = Uri.parse("content://$CONTENT_AUTHORITY")

    object RecordEntry : BaseColumns {
        private val TAG = RecordEntry::class.java.simpleName

        const val TABLE_NAME = "Record"
        val CONTENT_URI: Uri = Uri.withAppendedPath(BASE_CONTENT_URI, TABLE_NAME)

        const val CONTENT_LIST_TYPE = "${ContentResolver.CURSOR_DIR_BASE_TYPE}/$CONTENT_AUTHORITY/$TABLE_NAME"
        const val CONTENT_ITEM_TYPE = "${ContentResolver.CURSOR_ITEM_BASE_TYPE}/$CONTENT_AUTHORITY/$TABLE_NAME"

        const val ID = BaseColumns._ID
        const val COLUMN_TIMESTAMP = "timestamp"
        const val COLUMN_EXERCISE_NAME = "exercise_name"

        fun toContentValues(record: Record) = ContentValues().apply {
            put(COLUMN_TIMESTAMP, record.timestamp)
            put(COLUMN_EXERCISE_NAME, record.exercise.name)
        }

        fun fromCursor(cursor: Cursor): Record? {
            if (cursor.getColumnIndex(COLUMN_TIMESTAMP) < 0 || cursor.getColumnIndex(COLUMN_EXERCISE_NAME) < 0) {
                Log.w(TAG, "One or more columns were not found from cursor. Returning null record.")
                return null
            }

            val timestamp = cursor.getLong(cursor.getColumnIndex(COLUMN_TIMESTAMP))

            val exerciseName = cursor.getString(cursor.getColumnIndex(COLUMN_EXERCISE_NAME))
                ?: return null.also { Log.w(TAG, "Missing $COLUMN_EXERCISE_NAME. Return null.") }

            val exercise = STANDARD_STRETCH //TODO

            return if (exercise == null) {
                Log.w(TAG, "Exercise cannot be parsed. Something is corrupted when record is saved/ loaded. Returning null record")
                null
            } else {
                Record(timestamp, exercise)
            }
        }

        fun isValidForInsertion(values: ContentValues): Boolean {
            values.getAsLong(COLUMN_TIMESTAMP)
                ?: return false.also { Log.d(TAG, "isValidForInsertion: $COLUMN_TIMESTAMP should not be empty") }

            values.getAsString(COLUMN_EXERCISE_NAME)
                ?: return false.also { Log.d(TAG, "isValidForInsertion: $COLUMN_EXERCISE_NAME should not be empty") }

            return true
        }

        fun isValidForUpdate(values: ContentValues): Boolean {
            if (values.size() == 0) return false.also { Log.d(TAG, "isValidForUpdate: values doesn't have content") }

            if (values.containsKey(COLUMN_TIMESTAMP)) {
                values.getAsLong(COLUMN_TIMESTAMP)
                    ?: return false.also { Log.d(TAG, "isValidForUpdate: Timestamp should not be empty") }
            }

            if (values.containsKey(COLUMN_EXERCISE_NAME)) {
                values.getAsString(COLUMN_EXERCISE_NAME)
                    ?: return false.also { Log.d(TAG, "isValidForUpdate: plank type should not be empty") }
            }

            return true
        }
    }
}