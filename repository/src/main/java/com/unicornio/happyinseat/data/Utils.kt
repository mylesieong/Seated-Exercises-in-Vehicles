package com.unicornio.happyinseat.data

import android.content.ContentValues
import android.database.Cursor
import android.database.MatrixCursor
import android.util.Log
import com.unicornio.happyinseat.database.COLUMN_EXERCISE_NAME
import com.unicornio.happyinseat.database.COLUMN_ID
import com.unicornio.happyinseat.database.COLUMN_TIMESTAMP
import com.unicornio.happyinseat.database.ExerciseRecord
import com.unicornio.happyinseat.model.Exercise
import com.unicornio.happyinseat.model.STANDARD_STRETCH

private const val TAG = "Utils"

typealias Record = Pair<Long, Exercise>

fun fromContentValues(contentValues: ContentValues): ExerciseRecord? {
    if (!contentValues.containsKey(COLUMN_TIMESTAMP)) {
        return null
    }

    if (!contentValues.containsKey(COLUMN_EXERCISE_NAME)) {
        return null
    }

    return ExerciseRecord(-1, contentValues.getAsLong(COLUMN_TIMESTAMP), contentValues.getAsString(COLUMN_EXERCISE_NAME))
}

fun toContentValues(timestamp: Long, exercise: Exercise) = ContentValues().apply {
    put(COLUMN_TIMESTAMP, timestamp)
    put(COLUMN_EXERCISE_NAME, exercise.name)
}

fun fromCursorTakeOne(cursor: Cursor): Record? {
    val columnIndexTimestamp = cursor.getColumnIndex(COLUMN_TIMESTAMP)
    val columnIndexExerciseName = cursor.getColumnIndex(COLUMN_EXERCISE_NAME)
    if (columnIndexTimestamp < 0 || columnIndexExerciseName < 0) {
        Log.w(TAG, "One or more columns were not found from cursor. Returning null record.")
        return null
    }

    val timestamp = cursor.getLong(columnIndexTimestamp)
    val exercise = STANDARD_STRETCH //TODO

    return Record(timestamp, exercise)
}

fun toCursor(exercises: List<ExerciseRecord>): Cursor? {
    if (exercises.isEmpty()) {
        return null
    }

    return MatrixCursor(arrayOf(COLUMN_ID, COLUMN_TIMESTAMP, COLUMN_EXERCISE_NAME), exercises.size).apply {
        exercises.forEach {
            newRow()
                .add(COLUMN_ID, it.id)
                .add(COLUMN_TIMESTAMP, it.timestamp)
                .add(COLUMN_EXERCISE_NAME, it.exerciseName)
        }
    }
}

fun isValidForInsertion(values: ContentValues): Boolean {
    values.getAsLong(COLUMN_TIMESTAMP)
        ?: return false.also { Log.d(TAG, "isValidForInsertion: $COLUMN_TIMESTAMP should not be empty") }

    values.getAsString(COLUMN_EXERCISE_NAME)
        ?: return false.also { Log.d(TAG, "isValidForInsertion: $COLUMN_EXERCISE_NAME should not be empty") }

    return true
}