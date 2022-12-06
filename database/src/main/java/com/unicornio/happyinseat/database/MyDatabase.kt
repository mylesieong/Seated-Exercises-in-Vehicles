package com.unicornio.happyinseat.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase

@Database(entities = [ExerciseRecord::class], version = 2)
abstract class MyDatabase : RoomDatabase() {
    abstract fun exerciseDao(): ExerciseDao

    companion object {
        private const val DB_FILE_NAME = "shelter.db"

        private var database: MyDatabase? = null

        fun getInstance(context: Context): MyDatabase = database ?: Room
            .databaseBuilder(context, MyDatabase::class.java, DB_FILE_NAME)
            .addMigrations(MIGRATION_1_2)
            .build()
            .also {
                database = it
            }
    }
}

val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        /*
            Nothing in database schemas so that its nothing here. For your information, the old schemas is:

            db.execSQL(
                        "CREATE TABLE ${RecordEntry.TABLE_NAME} (" +
                            "${RecordEntry.ID} INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "${RecordEntry.COLUMN_TIMESTAMP} INTEGER NOT NULL," +
                            "${RecordEntry.COLUMN_EXERCISE_NAME} TEXT NOT NULL" +
                        ");"
            )
         */
    }
}
