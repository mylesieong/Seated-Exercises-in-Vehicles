package com.unicornio.happyinseat

import android.content.Context
import android.net.Uri
import android.util.Log
import android.util.TypedValue
import com.unicornio.happyinseat.persistence.Contract.RecordEntry
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.CONTENT_URI
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.fromCursor
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.toContentValues
import com.unicornio.toolish.utils.Utils
import java.util.*

const val TAG = "Helpers"

fun saveRecord(context: Context, record: Record): Uri? {
    Log.d(TAG, "saveRecord: record=$record")
    return context.contentResolver.insert(CONTENT_URI, toContentValues(record))
}

fun loadRecords(context: Context, exercise: Exercise? = null): List<Record> {
    val uri = CONTENT_URI
    val projection = arrayOf(
        RecordEntry.ID,
        RecordEntry.COLUMN_TIMESTAMP,
        RecordEntry.COLUMN_EXERCISE_NAME
    )

    val fullRecords = context.contentResolver.query(uri, projection, null, null, null)?.let { cursor ->
        (1..cursor.count).mapNotNull {
            cursor.moveToNext()
            fromCursor(cursor)
        }
    }
        ?: emptyList()

    val result = if (exercise == null) fullRecords else fullRecords.filter { it.exercise == exercise }
    return result.also {
        Log.d(TAG, "loadRecords: ${result.size} record(s) loaded.")
    }
}

fun getLatestRecord(context: Context): Record? {
    val fullRecords = loadRecords(context).sortedBy { it.timestamp }
    return if (fullRecords.isNotEmpty()) fullRecords.last() else null
}

fun deleteRecords(context: Context) {
    context.contentResolver.delete(CONTENT_URI, null, null)
}

fun indexRecordsByYearAndMonth(records: List<Record>): Map<Utils.YearMonth, List<Record>> = records.groupBy {
    val calendar = Utils.calender(it.timestamp)
    Utils.YearMonth(calendar[Calendar.YEAR], calendar[Calendar.MONTH])
}


fun Context.colorPrimary(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorPrimary, value, true)
    return value.data
}

fun Context.colorPrimaryVariant(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorPrimaryVariant, value, true)
    return value.data
}

fun Context.colorOnPrimary(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorOnPrimary, value, true)
    return value.data
}

fun Context.colorSecondary(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorSecondary, value, true)
    return value.data
}

fun Context.colorSecondaryVariant(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorSecondaryVariant, value, true)
    return value.data
}

fun Context.colorOnSecondary(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorOnSecondary, value, true)
    return value.data
}

fun Context.colorBackground(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.backgroundColor, value, true)
    return value.data
}

fun Context.colorSurface(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorSurface, value, true)
    return value.data
}

fun Context.colorOnBackground(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorOnBackground, value, true)
    return value.data
}

fun Context.colorOnSurface(): Int {
    val value = TypedValue()
    theme.resolveAttribute(R.attr.colorOnSurface, value, true)
    return value.data
}