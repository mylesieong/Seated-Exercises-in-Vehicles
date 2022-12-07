package com.unicornio.happyinseat.viewmodels

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.unicornio.happyinseat.data.Provider
import com.unicornio.happyinseat.data.toContentValues
import com.unicornio.happyinseat.model.Exercise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class RecordInsertViewModel(application: Application) : AndroidViewModel(application) {

    fun saveExercise(context: Context, timestamp: Long, exercise: Exercise) {
        Log.d(TAG, "saveExercise: exercise=$exercise")
        viewModelScope.launch(Dispatchers.IO) {
            context.contentResolver.insert(Provider.RECORDS_CONTENT_URI, toContentValues(timestamp, exercise))
        }
    }

    companion object {
        val TAG = RecordInsertViewModel::class.java.canonicalName
    }
}