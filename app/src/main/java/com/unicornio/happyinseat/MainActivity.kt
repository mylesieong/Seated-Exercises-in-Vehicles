package com.unicornio.happyinseat

import android.os.Bundle
import android.widget.Button
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setupBehavior()
    }

    private fun setupBehavior() {
        val buttonRunExercise = findViewById<ImageButton>(R.id.button_start_stretching)
        buttonRunExercise.setOnClickListener {
            Toast.makeText(this, "Start a fragment of Exercise overview, then if start, launch new activity", Toast.LENGTH_SHORT).show()
        }

        val buttonRunCore = findViewById<ImageButton>(R.id.button_start_core)
        buttonRunCore.setOnClickListener {
            Toast.makeText(this, "Start a fragment of Exercise overview, then if start, launch new activity", Toast.LENGTH_SHORT).show()
        }

        val buttonStartJourney = findViewById<ImageButton>(R.id.button_start_journey)
        buttonStartJourney.setOnClickListener {
            Toast.makeText(this, "Coming soon", Toast.LENGTH_SHORT).show()
        }
    }
}