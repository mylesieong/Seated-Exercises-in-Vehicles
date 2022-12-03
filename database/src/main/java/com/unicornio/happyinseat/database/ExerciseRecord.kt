package com.unicornio.happyinseat.database

import android.provider.BaseColumns
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.unicornio.toolish.utils.Utils
import java.util.*

const val TABLE_NAME = "Record"

const val COLUMN_ID = BaseColumns._ID
const val COLUMN_TIMESTAMP = "timestamp"
const val COLUMN_EXERCISE_NAME = "exercise_name"

@Entity(tableName = TABLE_NAME)
data class ExerciseRecord(
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = COLUMN_ID)
    val id: Int?,

    @ColumnInfo(name = COLUMN_TIMESTAMP)
    val timestamp: Long,

    @ColumnInfo(name = COLUMN_EXERCISE_NAME)
    val exerciseName: String
) {
    override fun toString(): String {
        val calendar = Utils.calender(timestamp)
        val y = calendar.get(Calendar.YEAR)
        val m = calendar.get(Calendar.MONTH) + 1
        val d = calendar.get(Calendar.DAY_OF_MONTH)
        return "Exercise[Entity](ymd=$y-$m-$d, timestamp=$timestamp, exercise=$exerciseName)"
    }
}
