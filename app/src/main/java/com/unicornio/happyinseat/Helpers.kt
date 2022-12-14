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
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material.AlertDialog
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.unicornio.happyinseat.data.Provider
import com.unicornio.happyinseat.data.Provider.Companion.RECORDS_CONTENT_URI
import com.unicornio.happyinseat.data.Record
import com.unicornio.happyinseat.data.toContentValues
import com.unicornio.happyinseat.model.Exercise
import com.unicornio.happyinseat.model.ONE_DAY_MILLIS
import com.unicornio.happyinseat.model.STANDARD_STRETCH
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

fun indexRecordsByYearAndMonth(records: List<Record>): Map<Utils.YearMonth, List<Record>> = records.groupBy {
    val calendar = Utils.calender(it.first)
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
