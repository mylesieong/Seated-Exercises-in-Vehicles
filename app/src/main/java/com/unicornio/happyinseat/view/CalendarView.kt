package com.unicornio.happyinseat.view

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.colorSecondary
import com.unicornio.toolish.utils.Utils.color
import kotlinx.android.synthetic.main.layout_calendar.view.*
import java.util.Calendar.*

class CalendarView(context: Context, attrs: AttributeSet) : FrameLayout(context, attrs) {

    private var textMonth: TextView
    private var btnPrev: ImageView
    private var btnNext: ImageView
    private var gridView: GridView

    /**
     * Note: month starts from 0, aligning to how Calendar handles months
     */
    private var month: Int = JANUARY //By Default
    private var year: Int = 2000 //By Default

    /**
     * Map of day of month which should be highlighted and alpha
     */
    private val highlightDictionary = mutableMapOf<Int, Float>()
    private var dateSelectedListener: OnDateSelectedListener? = null

    fun setOnDateSelectedListener(l: OnDateSelectedListener) {
        dateSelectedListener = l
    }

    interface OnDateSelectedListener {
        /**
         * @param year
         * @param month starts from 0
         * @param day starts from 0
         */
        fun onDateSelected(year: Int, month: Int, day: Int)
    }

    private var flipListener: OnCalendarFlipListener? = null

    fun setOnCalendarFlipListener(l: OnCalendarFlipListener) {
        flipListener = l
    }

    interface OnCalendarFlipListener {
        fun onFlip(year: Int, month: Int)
    }

    init {
        val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        inflater.inflate(R.layout.layout_calendar, this)

        textMonth = findViewById(R.id.text_month)
        btnPrev = findViewById(R.id.button_previous)
        btnNext = findViewById(R.id.button_next)
        gridView = findViewById(R.id.grid)

        button_next.setOnClickListener {
            if (month == DECEMBER) {
                month = JANUARY
                year++
            } else {
                month++
            }
            flipListener?.onFlip(year, month)
        }

        button_previous.setOnClickListener {
            if (month == JANUARY) {
                month = DECEMBER
                year--
            } else {
                month--
            }
            flipListener?.onFlip(year, month)
        }

        render()
    }

    private fun isCurrentMonth(): Boolean {
        val now = getInstance()
        return now[MONTH] == month && now[YEAR] == year
    }

    private fun render() {
        val calendar = getInstance().apply {
            set(DAY_OF_MONTH, 1)
            set(YEAR, year)
            set(MONTH, month)
        }

        val totalDaysInMonth = calendar.getActualMaximum(DAY_OF_MONTH)
        val daysOffset = calendar.get(DAY_OF_WEEK) - SUNDAY

        gridView.adapter = CalendarAdapter(context, assembleDayBeans(totalDaysInMonth, daysOffset, isCurrentMonth(), highlightDictionary)).also {
            it.onDateViewClickedAction = { year, month, day ->
                dateSelectedListener?.onDateSelected(year, month, day)
            }
        }

        textMonth.text = "${translateMonth(month)} $year"
    }

    private fun assembleDayBeans(totalDaysInMonth: Int, daysOffset: Int, isCurrentMonth: Boolean, highlightDictionary: Map<Int, Float>): List<DayBean> {
        val list = mutableListOf<DayBean>()

        repeat(daysOffset) {
            list.add(DayBean("", isToday = false, isHighlight = false, highlightAlpha = 0f, year = -1, month = -1, day = -1))
        }

        (1..totalDaysInMonth).forEach {
            val dayName = it
            val dayNameOfToday = getInstance()[DAY_OF_MONTH]

            list.add(
                DayBean(
                    "$dayName",
                    isToday = isCurrentMonth && dayNameOfToday == dayName,
                    isHighlight = highlightDictionary.containsKey(dayName),
                    highlightAlpha = highlightDictionary[dayName] ?: 0f,
                    year = year,
                    month = month,
                    day = it
                )
            )
        }

        return list
    }

    private fun translateMonth(month: Int): String = when (month) {
        0 -> "January"
        1 -> "February"
        2 -> "March"
        3 -> "April"
        4 -> "May"
        5 -> "June"
        6 -> "July"
        7 -> "August"
        8 -> "September"
        9 -> "October"
        10 -> "November"
        11 -> "December"
        else -> ""
    }

    fun setMonthAndYear(month: Int, year: Int) {
        this.month = month
        this.year = year
        highlightDictionary.clear()
        render()
    }

    /**
     * @param days a map of highlight day (int) and highlight color id(int)
     */
    fun setHighlightDictionary(days: Map<Int, Float>) {
        highlightDictionary.run {
            clear()
            putAll(days)
        }
        render()
    }

    /**
     * @param year
     * @param month 0-based
     * @param day 1-based
     */
    data class DayBean(val name: String, val isToday: Boolean, val isHighlight: Boolean, val highlightAlpha: Float, val year: Int, val month: Int, val day: Int)

    private class CalendarAdapter(context: Context, dayBeans: List<DayBean>) : ArrayAdapter<DayBean>(context, R.layout.item_calendar_day, dayBeans) {

        var onDateViewClickedAction: (Int, Int, Int) -> Unit = { _, _, _ -> }

        private val inflater: LayoutInflater = LayoutInflater.from(context)

        override fun getView(position: Int, view: View?, parent: ViewGroup): View {
            val resultView: View = view ?: inflater.inflate(R.layout.item_calendar_day, parent, false)
            val textView = resultView.findViewById<TextView>(R.id.text_day)
            val underlineView = resultView.findViewById<ImageView>(R.id.image_underline)

            val dayBean = getItem(position)

            textView.text = dayBean?.name

            if (dayBean?.isToday == true) {
                textView.setTextColor(context.colorSecondary())
            }

            if (dayBean?.isHighlight == true) {
                underlineView.alpha = dayBean.highlightAlpha
                underlineView.visibility = View.VISIBLE
            }

            if (dayBean != null && dayBean.year != -1 && dayBean.month != -1 && dayBean.day != -1) {
                resultView.setOnClickListener {
                    onDateViewClickedAction.invoke(dayBean.year, dayBean.month, dayBean.day)
                }
            }

            return resultView
        }
    }
}