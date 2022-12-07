package com.unicornio.happyinseat

import android.app.Activity
import android.content.Context
import android.net.Uri
import android.util.Log
import android.util.TypedValue
import android.view.WindowManager
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.unicornio.happyinseat.persistence.Contract.RecordEntry
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.CONTENT_URI
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.fromCursor
import com.unicornio.happyinseat.persistence.Contract.RecordEntry.toContentValues
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.toolish.utils.Utils
import java.util.*

const val TAG = "Helpers"

@Composable
fun ComposeAlertDialog(
    title: String,
    description: String,
    onPositive: () -> Unit,
    onNegative: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        title = {
            Text(text = title, style = MaterialTheme.typography.h6)
        },
        text = {
            Text(text = description, style = MaterialTheme.typography.body1)
        },
        buttons = {
            Row {
                Spacer(modifier = Modifier.weight(1f))
                Text(
                    text = "NO",
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .clickable { onNegative.invoke() }
                        .padding(horizontal = 36.dp, vertical = 24.dp)
                )
                Text(
                    text = "YES",
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colors.secondary,
                    modifier = Modifier
                        .clickable { onPositive.invoke() }
                        .padding(horizontal = 36.dp, vertical = 24.dp)
                )
            }
        },
        onDismissRequest = onDismiss
    )
}

@Composable
@Preview
fun ComposeAlertDialogPreview() {
    ApplicationTheme {
        ComposeAlertDialog("title", "description", {}, {}, {})
    }
}

fun Activity.setKeepScreenOn(isKeepOn: Boolean) {
    if (isKeepOn) {
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    } else {
        window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
}

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

fun insertDummyRecordForDebugBuild(context: Context) {
    if (BuildConfig.DEBUG) {
        deleteRecords(context)

        val time6DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 6
        saveRecord(context, Record(time6DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time6DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time6DaysAgo, STANDARD_STRETCH))

        val time5DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 5
        saveRecord(context, Record(time5DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time5DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time5DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time5DaysAgo, STANDARD_STRETCH))

        val time3DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 3
        saveRecord(context, Record(time3DaysAgo, STANDARD_STRETCH))

        val time2DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 2
        saveRecord(context, Record(time2DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time2DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time2DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time2DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time2DaysAgo, STANDARD_STRETCH))

        val time1DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 1
        saveRecord(context, Record(time1DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time1DaysAgo, STANDARD_STRETCH))

        val time0DaysAgo = System.currentTimeMillis()
        saveRecord(context, Record(time0DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time0DaysAgo, STANDARD_STRETCH))
        saveRecord(context, Record(time0DaysAgo, STANDARD_STRETCH))
    }
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