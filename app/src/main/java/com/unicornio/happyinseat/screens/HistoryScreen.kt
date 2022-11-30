package com.unicornio.happyinseat.fragments

import android.content.Context
import android.content.res.Configuration.UI_MODE_NIGHT_YES
import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.unicornio.happyinseat.Record
import com.unicornio.happyinseat.indexRecordsByYearAndMonth
import com.unicornio.happyinseat.loadRecords
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.happyinseat.view.CalendarView
import com.unicornio.toolish.utils.Utils
import com.unicornio.toolish.utils.Utils.isSameDay
import java.util.*

private const val TAG = "HistoryScreen"

@Composable
fun HistoryScreen() {
    val context = LocalView.current.context

    val now = Utils.calender()
    val dayNow = now[Calendar.DAY_OF_MONTH]
    val yearNow = now[Calendar.YEAR]
    val monthNow = now[Calendar.MONTH]

    val recordsShared = remember {
        mutableStateListOf<Record>().also {
            it.addAll(loadRecords(context, dayNow, monthNow, yearNow))
        }
    }

    Column(Modifier.fillMaxSize()) {
        Calender(recordsShared, monthNow, yearNow)

        if (recordsShared.isNotEmpty()) {
            RecordList(context, recordsShared)
        }
    }
}

private fun loadRecords(context: Context, day: Int, month: Int, year: Int): List<Record> {
    return loadRecords(context).filter {
        Utils.calender(year, month, day).isSameDay(it.timestamp)
    }
}

@Composable
fun Calender(recordsShared: SnapshotStateList<Record>, monthNow: Int, yearNow: Int) {

    fun getHighlightDictionary(records: List<Record>, year: Int, month: Int): Map<Int, Float> {
        val recordsOfGivenYearMonth = indexRecordsByYearAndMonth(records)[Utils.YearMonth(year, month)] ?: emptyList()
        if (recordsOfGivenYearMonth.isEmpty()) {
            Log.d(TAG, "getHighlightDictionary: no records found in given year and month")
            return emptyMap()
        }

        val recordsGroupByDay = recordsOfGivenYearMonth.groupBy { Utils.calender(it.timestamp)[Calendar.DAY_OF_MONTH] }

        val baseAlpha = 1f
        val mapDayAndAlpha = mutableMapOf<Int, Float>()
        recordsGroupByDay.entries.forEach { entry ->
            mapDayAndAlpha[entry.key] = baseAlpha
        }

        return mapDayAndAlpha.also {
            Log.d(TAG, "getHighlightDictionary: result = $it")
        }
    }

    AndroidView(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        factory = {
            CalendarView(it, null).apply {
                setMonthAndYear(monthNow, yearNow)

                val fullRecords = loadRecords(context)

                setHighlightDictionary(getHighlightDictionary(fullRecords, yearNow, monthNow))

                setOnCalendarFlipListener(object : CalendarView.OnCalendarFlipListener {
                    override fun onFlip(year: Int, month: Int) {
                        setHighlightDictionary(getHighlightDictionary(fullRecords, year, month))
                    }
                })

                setOnDateSelectedListener(object : CalendarView.OnDateSelectedListener {
                    override fun onDateSelected(year: Int, month: Int, day: Int) {
                        Log.d(TAG, "onDateSelected: ymd=$year/$month/$day")
                        val list = loadRecords(context, day, month, year)
                        recordsShared.clear()
                        recordsShared.addAll(list)
                    }
                })
            }

        },
        update = { }
    )
}

@Composable
private fun RecordList(context: Context, recordsShared: SnapshotStateList<Record>) {
    LazyColumn(Modifier.fillMaxWidth()) {
        item {
            Text(text = "Records", Modifier.fillMaxWidth(), textAlign = TextAlign.Center, style = MaterialTheme.typography.subtitle1)
        }

        item {
            Spacer(modifier = Modifier.height(8.dp))
        }

        recordsShared.map {
            item {
                RecordItem(context, it)
            }
        }
    }
}

@Composable
fun RecordItem(context: Context, record: Record) {
    Row(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 4.dp)
    ) {
        val datetime = Utils.toDateString(context, record.timestamp, true)
        Text(text = datetime, style = MaterialTheme.typography.body2, fontSize = 12.sp, modifier = Modifier.weight(1f))
        Text(text = record.exercise.name, style = MaterialTheme.typography.body2, fontSize = 12.sp)
    }
}

@Composable
@Preview(name = "Day mode")
@Preview(name = "Night mode", uiMode = UI_MODE_NIGHT_YES, showBackground = true)
fun HistoryScreenPreview() {
    ApplicationTheme {
        Surface {
            HistoryScreen()
        }
    }
}