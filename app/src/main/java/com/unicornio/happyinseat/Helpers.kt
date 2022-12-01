package com.unicornio.happyinseat

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.util.TypedValue
import android.view.WindowManager
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.AlertDialog
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.unicornio.happyinseat.data.Contract.RecordEntry
import com.unicornio.happyinseat.data.Contract.RecordEntry.CONTENT_URI
import com.unicornio.happyinseat.data.Contract.RecordEntry.fromCursor
import com.unicornio.happyinseat.data.Contract.RecordEntry.toContentValues
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.toolish.utils.Utils
import java.util.*

const val TAG = "Helpers"

fun rateApp(context: Context) {
    fun rateIntentForUrl(url: String): Intent {
        val packageName = context.packageName
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(String.format("%s?id=%s", url, packageName)))
        val flags = Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_DOCUMENT
        intent.addFlags(flags)
        return intent
    }

    try {
        val rateIntent = rateIntentForUrl("market://details")
        context.startActivity(rateIntent)

    } catch (e: ActivityNotFoundException) {
        val rateIntent = rateIntentForUrl("https://play.google.com/store/apps/details")
        context.startActivity(rateIntent)
    }
}

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

fun loadRecords(context: Context, exercise: com.unicornio.happyinseat.model.Exercise? = null): List<com.unicornio.happyinseat.model.Record> {
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

fun getLatestRecord(context: Context): com.unicornio.happyinseat.model.Record? {
    val fullRecords = loadRecords(context).sortedBy { it.timestamp }
    return if (fullRecords.isNotEmpty()) fullRecords.last() else null
}

fun deleteRecords(context: Context) {
    context.contentResolver.delete(CONTENT_URI, null, null)
}

fun indexRecordsByYearAndMonth(records: List<com.unicornio.happyinseat.model.Record>): Map<Utils.YearMonth, List<com.unicornio.happyinseat.model.Record>> = records.groupBy {
    val calendar = Utils.calender(it.timestamp)
    Utils.YearMonth(calendar[Calendar.YEAR], calendar[Calendar.MONTH])
}

fun insertDummyRecordForDebugBuild(context: Context) {
    if (BuildConfig.DEBUG) {
        deleteRecords(context)

        val time6DaysAgo = System.currentTimeMillis() - com.unicornio.happyinseat.model.ONE_DAY_MILLIS * 6
        saveRecord(context, com.unicornio.happyinseat.model.Record(time6DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time6DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time6DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))

        val time5DaysAgo = System.currentTimeMillis() - com.unicornio.happyinseat.model.ONE_DAY_MILLIS * 5
        saveRecord(context, com.unicornio.happyinseat.model.Record(time5DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time5DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time5DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time5DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))

        val time3DaysAgo = System.currentTimeMillis() - com.unicornio.happyinseat.model.ONE_DAY_MILLIS * 3
        saveRecord(context, com.unicornio.happyinseat.model.Record(time3DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))

        val time2DaysAgo = System.currentTimeMillis() - com.unicornio.happyinseat.model.ONE_DAY_MILLIS * 2
        saveRecord(context, com.unicornio.happyinseat.model.Record(time2DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time2DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time2DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time2DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time2DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))

        val time1DaysAgo = System.currentTimeMillis() - com.unicornio.happyinseat.model.ONE_DAY_MILLIS * 1
        saveRecord(context, com.unicornio.happyinseat.model.Record(time1DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time1DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))

        val time0DaysAgo = System.currentTimeMillis()
        saveRecord(context, com.unicornio.happyinseat.model.Record(time0DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time0DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
        saveRecord(context, com.unicornio.happyinseat.model.Record(time0DaysAgo, com.unicornio.happyinseat.model.STANDARD_STRETCH))
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
