package com.unicornio.happyinseat.model

import com.unicornio.toolish.utils.Utils
import java.util.*

data class Record(val timestamp: Long, val exercise: Exercise) {
    override fun toString(): String {
        val calendar = Utils.calender(timestamp)
        val y = calendar.get(Calendar.YEAR)
        val m = calendar.get(Calendar.MONTH) + 1
        val d = calendar.get(Calendar.DAY_OF_MONTH)
        return "Record(ymd=$y-$m-$d, timestamp=$timestamp, exercise=$exercise)"
    }
}