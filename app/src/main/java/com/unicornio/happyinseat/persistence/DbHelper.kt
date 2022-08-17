package com.unicornio.happyinseat.persistence

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.unicornio.happyinseat.persistence.Contract.RecordEntry

class DbHelper(context: Context?) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
    /**
     * Create table
     */
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(
            "CREATE TABLE ${RecordEntry.TABLE_NAME} (" +
                    "${RecordEntry.ID} INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "${RecordEntry.COLUMN_TIMESTAMP} INTEGER NOT NULL," +
                    "${RecordEntry.COLUMN_EXERCISE_NAME} TEXT NOT NULL" +
                    ");"
        )
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        //to be filled
    }

    companion object {
        val TAG = DbHelper::class.java.simpleName
        private const val DATABASE_NAME = "shelter.db"
        private const val DATABASE_VERSION = 1
    }
}