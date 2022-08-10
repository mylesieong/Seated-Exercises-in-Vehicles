package com.unicornio.happyinseat

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.Toast
import androidx.fragment.app.Fragment

class HomeFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_home, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        setupBehavior(view)
    }

    private fun setupBehavior(root: View) {
        val buttonRunExercise = root.findViewById<ImageButton>(R.id.button_start_stretching)
        buttonRunExercise.setOnClickListener {
            startActivity(Intent(root.context, ExerciseActivity::class.java))
            //TODO
        }

        val buttonRunCore = root.findViewById<ImageButton>(R.id.button_start_core)
        buttonRunCore.setOnClickListener {
            startActivity(Intent(root.context, ExerciseActivity::class.java))
            //TODO
        }

        val buttonStartJourney = root.findViewById<ImageButton>(R.id.button_start_journey)
        buttonStartJourney.setOnClickListener {
            Toast.makeText(root.context, "Coming soon", Toast.LENGTH_SHORT).show()
        }
    }

    companion object {
        const val TAG = "HomeFragment"
    }
}