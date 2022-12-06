package com.unicornio.happyinseat.screens

import android.content.res.Configuration.UI_MODE_NIGHT_YES
import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.viewmodel.compose.viewModel
import com.unicornio.happyinseat.data.Record
import com.unicornio.happyinseat.indexRecordsByYearAndMonth
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.happyinseat.view.CalendarView
import com.unicornio.happyinseat.viewmodels.RecordFetchViewModel
import com.unicornio.toolish.utils.Utils
import com.unicornio.toolish.utils.Utils.isSameDay
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.util.*

private const val TAG = "HistoryScreen"

@Composable
fun HistoryScreen(viewModel: RecordFetchViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    val dayPicked = remember { mutableStateOf<Int?>(null) }
    val monthPicked = remember { mutableStateOf<Int?>(null) }
    val yearPicked = remember { mutableStateOf<Int?>(null) }

    Column(Modifier.fillMaxSize()) {
        Calender(uiState.records, yearPicked, monthPicked, dayPicked)
        RecordList(uiState.records, yearPicked, monthPicked, dayPicked)
    }
}

private fun List<Record>.filter(year: Int?, month: Int?, day: Int?): List<Record> {
    if (year == null || month == null || day == null) {
        return emptyList()
    }

    return filter { Utils.calender(year, month, day).isSameDay(it.first) }
}

@Composable
fun Calender(records: List<Record>, yearPicked: MutableState<Int?>, monthPicked: MutableState<Int?>, dayPicked: MutableState<Int?>) {

    fun getHighlightDictionary(records: List<Record>, year: Int, month: Int): Map<Int, Float> {
        val recordsOfGivenYearMonth = indexRecordsByYearAndMonth(records)[Utils.YearMonth(year, month)] ?: emptyList()
        if (recordsOfGivenYearMonth.isEmpty()) {
            Log.d(TAG, "getHighlightDictionary: no records found in given year and month")
            return emptyMap()
        }

        val recordsGroupByDay = recordsOfGivenYearMonth.groupBy { Utils.calender(it.first)[Calendar.DAY_OF_MONTH] }

        val baseAlpha = 1f
        val mapDayAndAlpha = mutableMapOf<Int, Float>()
        recordsGroupByDay.entries.forEach { entry ->
            mapDayAndAlpha[entry.key] = baseAlpha
        }

        return mapDayAndAlpha.also {
            Log.d(TAG, "getHighlightDictionary: result = $it")
        }
    }

    val (yearNow, monthNow) = Utils.calender().let {
        Pair(it[Calendar.YEAR], it[Calendar.MONTH])
    }

    AndroidView(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        factory = {
            CalendarView(it, null).apply {
                setMonthAndYear(monthNow, yearNow)

                setOnCalendarFlipListener(object : CalendarView.OnCalendarFlipListener {
                    override fun onFlip(year: Int, month: Int) {
                        setHighlightDictionary(getHighlightDictionary(records, year, month))
                    }
                })

                setOnDateSelectedListener(object : CalendarView.OnDateSelectedListener {
                    override fun onDateSelected(year: Int, month: Int, day: Int) {
                        Log.d(TAG, "onDateSelected: ymd=$year/$month/$day")
                        yearPicked.value = year
                        monthPicked.value = month
                        dayPicked.value = day
                    }
                })
            }

        },
        update = {
            it.setHighlightDictionary(getHighlightDictionary(records, yearNow, monthNow))
        }
    )
}

@Composable
fun RecordList(records: List<Record>, yearPicked: MutableState<Int?>, monthPicked: MutableState<Int?>, dayPicked: MutableState<Int?>) {
    val recordsToShow = records.filter(yearPicked.value, monthPicked.value, dayPicked.value)

    if (recordsToShow.isNotEmpty()) {
        Text(text = "Records", Modifier.fillMaxWidth(), textAlign = TextAlign.Center, style = MaterialTheme.typography.subtitle1)

        Spacer(modifier = Modifier.height(8.dp))

        LazyColumn(Modifier.fillMaxWidth()) {
            recordsToShow.map {
                item {
                    RecordItem(it)
                }
            }

            item {
                Spacer(modifier = Modifier.height(60.dp))
            }
        }
    }
}

@Composable
fun RecordItem(record: Record) {
    val context = LocalView.current.context

    Row(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 4.dp)
    ) {
        val datetime = Utils.toDateString(context, record.first, true)
        Text(text = datetime, style = MaterialTheme.typography.body2, fontSize = 12.sp, modifier = Modifier.weight(1f))
        Text(text = record.second.name, style = MaterialTheme.typography.body2, fontSize = 12.sp)
    }
}

@Composable
@Preview(name = "Day mode")
@Preview(name = "Night mode", uiMode = UI_MODE_NIGHT_YES, showBackground = true)
fun HistoryScreenPreview() {
    ApplicationTheme {
        HistoryScreen()
    }
}
