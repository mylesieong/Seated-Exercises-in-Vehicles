package com.unicornio.happyinseat.database

import android.database.Cursor
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ExerciseDao {
    @Query("SELECT * FROM $TABLE_NAME")//TODO central manage table name
    fun getAll(): Cursor

    @Insert
    fun insert(exercise: ExerciseRecord): Long

    @Query("DELETE FROM $TABLE_NAME")
    fun delete(): Int
}