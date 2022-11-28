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
import com.unicornio.happyinseat.Record
import com.unicornio.happyinseat.databinding.FragmentHistoryBinding
import com.unicornio.happyinseat.indexRecordsByYearAndMonth
import com.unicornio.happyinseat.loadRecords
import com.unicornio.happyinseat.view.CalendarView
import com.unicornio.toolish.utils.Utils
import com.unicornio.toolish.utils.Utils.isSameDay
import java.util.*

class HistoryFragment : Fragment() {
    private var _binding: FragmentHistoryBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHistoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onResume() {
        super.onResume()
        val records = loadRecords(requireContext())
        setupCalendar(records)
    }

    private fun setupCalendar(records: List<Record>) {
        /**
         * @return map of highlight day and highlight color id
         */
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

            return mapDayAndAlpha
        }

        val now = Utils.calender()
        val yearNow = now[Calendar.YEAR]
        val monthNow = now[Calendar.MONTH]

        binding.calendarView.setMonthAndYear(monthNow, yearNow)
        binding.calendarView.setHighlightDictionary(getHighlightDictionary(records, yearNow, monthNow))

        binding.calendarView.setOnCalendarFlipListener(object : CalendarView.OnCalendarFlipListener {
            override fun onFlip(year: Int, month: Int) = binding.calendarView.setHighlightDictionary(getHighlightDictionary(records, year, month))
        })

        binding.calendarView.setOnDateSelectedListener(object : CalendarView.OnDateSelectedListener {
            override fun onDateSelected(year: Int, month: Int, day: Int) {
                Log.d(TAG, "onDateSelected: ymd=$year/$month/$day")
                showRecords(year, month, day)
            }

            private fun showRecords(year: Int, month: Int, day: Int) {
                val data = loadRecords(requireContext()).filter {
                    Utils.calender(year, month, day).isSameDay(it.timestamp)
                }

                if (data.isEmpty()) {
                    binding.panelEmptyView.visibility = View.VISIBLE
                    binding.textHeader.visibility = View.GONE
                    binding.panelRecords.visibility = View.GONE
                    binding.listOfRecords.visibility = View.GONE

                } else {
                    binding.panelEmptyView.visibility = View.GONE
                    binding.textHeader.visibility = View.VISIBLE
                    binding.panelRecords.visibility = View.VISIBLE
                    binding.listOfRecords.visibility = View.VISIBLE

                    fillList(data)
                }
            }

            fun fillList(data: List<Record>) {
                binding.listOfRecords.apply {
                    adapter = Adapter(requireContext(), data)
                    layoutManager = LinearLayoutManager(requireContext())
                }
            }
        })
    }

    class Adapter(private val context: Context, private val dataSet: List<Record>) : RecyclerView.Adapter<Adapter.ViewHolder>() {

        class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
            val textDate: TextView = view.findViewById(R.id.text_date)
            val textExerciseName: TextView = view.findViewById(R.id.text_exercise_name)
        }

        override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(viewGroup.context).inflate(R.layout.item_records, viewGroup, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
            val record = dataSet[position]
            viewHolder.textDate.text = Utils.toDateString(context, record.timestamp, true)
            viewHolder.textExerciseName.text = record.exercise.name
        }

        override fun getItemCount() = dataSet.size
    }

    companion object {
        const val TAG = "HistoryFragment"
    }
}