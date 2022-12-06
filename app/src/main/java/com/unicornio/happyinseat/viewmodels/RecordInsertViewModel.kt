package com.unicornio.happyinseat.viewmodels

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.unicornio.happyinseat.BuildConfig
import com.unicornio.happyinseat.data.Provider
import com.unicornio.happyinseat.data.toContentValues
import com.unicornio.happyinseat.deleteRecords
import com.unicornio.happyinseat.model.Exercise
import com.unicornio.happyinseat.model.ONE_DAY_MILLIS
import com.unicornio.happyinseat.model.STANDARD_STRETCH
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class RecordInsertViewModel(application: Application) : AndroidViewModel(application) {

    fun saveExercise(context: Context, timestamp: Long, exercise: Exercise) {
        Log.d(TAG, "saveExercise: exercise=$exercise")
        viewModelScope.launch (Dispatchers.IO) {
            context.contentResolver.insert(Provider.RECORDS_CONTENT_URI, toContentValues(timestamp, exercise))
        }
    }

    fun insertDummyRecordForDebugBuild(context: Context) {
        if (BuildConfig.DEBUG) {
            deleteRecords(context)

            val time6DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 6
            saveExercise(context, time6DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time6DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time6DaysAgo, STANDARD_STRETCH)

            val time5DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 5
            saveExercise(context, time5DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time5DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time5DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time5DaysAgo, STANDARD_STRETCH)

            val time3DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 3
            saveExercise(context, time3DaysAgo, STANDARD_STRETCH)

            val time2DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 2
            saveExercise(context, time2DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time2DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time2DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time2DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time2DaysAgo, STANDARD_STRETCH)

            val time1DaysAgo = System.currentTimeMillis() - ONE_DAY_MILLIS * 1
            saveExercise(context, time1DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time1DaysAgo, STANDARD_STRETCH)

            val time0DaysAgo = System.currentTimeMillis()
            saveExercise(context, time0DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time0DaysAgo, STANDARD_STRETCH)
            saveExercise(context, time0DaysAgo, STANDARD_STRETCH)
        }
    }

    companion object {
        val TAG = RecordInsertViewModel::class.java.canonicalName
    }
}