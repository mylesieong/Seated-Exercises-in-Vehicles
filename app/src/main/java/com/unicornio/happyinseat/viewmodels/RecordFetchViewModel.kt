package com.unicornio.happyinseat.viewmodels

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.unicornio.happyinseat.TAG
import com.unicornio.happyinseat.data.Provider
import com.unicornio.happyinseat.data.Record
import com.unicornio.happyinseat.data.fromCursorTakeOne
import com.unicornio.happyinseat.model.Exercise
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class RecordFetchViewModel(application: Application) : AndroidViewModel(application) {

    data class RecordUIState(
        val records: List<Record>
    )

    private val _uiState = MutableStateFlow(RecordUIState(emptyList()))
    val uiState = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            _uiState.update { currentState ->
                currentState.copy(
                    records = loadExercises(application)
                )
            }
        }
    }

    private fun loadExercises(context: Context, exercise: Exercise? = null): List<Record> {
        val uri = Provider.RECORDS_CONTENT_URI

        val fullRecords = context.contentResolver.query(uri, null, null, null, null)?.let { cursor ->
            (1..cursor.count).mapNotNull {
                cursor.moveToNext()
                fromCursorTakeOne(cursor)
            }
        }
            ?: emptyList()

        val result = if (exercise == null) fullRecords else fullRecords.filter { it.second == exercise }

        return result.also {
            Log.d(TAG, "loadRecords: ${result.size} Exercise(s) loaded.")
        }
    }
}