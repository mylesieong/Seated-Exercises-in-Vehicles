package com.unicornio.happyinseat.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ExerciseDao {
    @Query("SELECT * FROM $TABLE_NAME")//TODO central manage table name
    fun getAll(): List<ExerciseRecord>

    @Insert
    fun insert(exercise: ExerciseRecord): Long

    @Query("DELETE FROM $TABLE_NAME")
    fun delete(): Int
}