package com.unicornio.happyinseat.fragments

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.unicornio.happyinseat.R
import com.unicornio.toolish.utils.Utils
import com.unicornio.toolish.utils.Utils.isSameDay
import kotlinx.android.synthetic.main.fragment_history.*
import java.util.*

class HistoryFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_history, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")
    }
//
//    override fun onResume() {
//        super.onResume()
//        val records = loadRecords(requireContext())
//        setupCalendar(records)
//    }
//
//    private fun setupCalendar(records: List<Record>) {
//        /**
//         * @return map of highlight day and highlight color id
//         */
//        fun getHighlightDictionary(records: List<Record>, year: Int, month: Int): Map<Int, Float> {
//            val recordsOfGivenYearMonth = indexRecordsByYearAndMonth(records)[Utils.YearMonth(year, month)] ?: emptyList()
//            if (recordsOfGivenYearMonth.isEmpty()) {
//                Log.d(TAG, "getHighlightDictionary: no records found in given year and month")
//                return emptyMap()
//            }
//
//            val recordsGroupByDay = recordsOfGivenYearMonth.groupBy { Utils.calender(it.timestamp)[Calendar.DAY_OF_MONTH] }
//
//            val mapDayAndDurationSummary = mutableMapOf<Int, Int>()
//            recordsGroupByDay.entries.forEach { entry ->
//                mapDayAndDurationSummary[entry.key] = entry.value.sumBy { it.duration }
//            }
//
//            val maxDurationSummary: Int = mapDayAndDurationSummary.values.max()!!
//            val minDurationSummary: Int = mapDayAndDurationSummary.values.min()!!
//            val delta = maxDurationSummary - minDurationSummary
//
//            val mapDayAndDurationSummaryIntensity = mutableMapOf<Int, Float>()
//            mapDayAndDurationSummary.entries.forEach { entry ->
//                mapDayAndDurationSummaryIntensity[entry.key] = (entry.value - minDurationSummary).toFloat() / delta
//            }
//
//            val baseAlpha = 0.2f
//            val mapDayAndAlpha = mutableMapOf<Int, Float>()
//            mapDayAndDurationSummaryIntensity.entries.forEach { entry ->
//                mapDayAndAlpha[entry.key] = baseAlpha + (1 - baseAlpha) * entry.value
//            }
//
//            return mapDayAndAlpha
//        }
//
//        val now = Utils.calender()
//        val yearNow = now[Calendar.YEAR]
//        val monthNow = now[Calendar.MONTH]
//
//        calendarView.setMonthAndYear(monthNow, yearNow)
//        calendarView.setHighlightDictionary(getHighlightDictionary(records, yearNow, monthNow))
//
//        calendarView.setOnCalendarFlipListener(object : CalendarView.OnCalendarFlipListener {
//            override fun onFlip(year: Int, month: Int) = calendarView.setHighlightDictionary(getHighlightDictionary(records, year, month))
//        })
//
//        calendarView.setOnDateSelectedListener(object : CalendarView.OnDateSelectedListener {
//            override fun onDateSelected(year: Int, month: Int, day: Int) {
//                Log.d(TAG, "onDateSelected: ymd=$year/$month/$day")
//
//                header.visibility = View.VISIBLE
//                showRecords(year, month, day)
//            }
//
//            private fun showRecords(year: Int, month: Int, day: Int) {
//                val data = loadRecords(requireContext()).filter {
//                    Utils.calender(year, month, day).isSameDay(it.timestamp)
//                }
//
//                if (data.isEmpty()) {
//                    panel_empty_view.visibility = View.VISIBLE
//                    header.visibility = View.GONE
//                    list_of_records.visibility = View.GONE
//
//                } else {
//                    panel_empty_view.visibility = View.GONE
//                    header.visibility = View.VISIBLE
//                    list_of_records.visibility = View.VISIBLE
//
//                    fillList(data)
//                }
//            }
//
//            fun fillList(data: List<Record>) {
//                list_of_records.apply {
//                    adapter = Adapter(requireContext(), data)
//                    layoutManager = LinearLayoutManager(requireContext())
//                }
//            }
//        })
//    }
//
//    class Adapter(private val context: Context, private val dataSet: List<Record>) : RecyclerView.Adapter<Adapter.ViewHolder>() {
//
//        class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
//            val textDate: TextView = view.findViewById(R.id.text_date)
//            val textPlank: TextView = view.findViewById(R.id.text_plank)
//            val textDuration: TextView = view.findViewById(R.id.text_duration)
//        }
//
//        override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
//            val view = LayoutInflater.from(viewGroup.context).inflate(R.layout.item_records, viewGroup, false)
//            return ViewHolder(view)
//        }
//
//        override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
//            val record = dataSet[position]
//            viewHolder.textDate.text = Utils.toDateString(context, record.timestamp, true)
//            viewHolder.textPlank.text = record.plank.marketName()
//            viewHolder.textDuration.text = Utils.formatTimerText(record.duration)
//        }
//
//        override fun getItemCount() = dataSet.size
//    }

    companion object {
        const val TAG = "HistoryFragment"
    }
}