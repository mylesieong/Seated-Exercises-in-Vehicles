package com.unicornio.happyinseat.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.unicornio.happyinseat.activities.ExerciseActivity
import com.unicornio.happyinseat.R
import com.unicornio.toolish.utils.Utils.shotToast

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
        }

        val buttonRunCore = root.findViewById<ImageButton>(R.id.button_start_core)
        buttonRunCore.setOnClickListener {
            root.context.shotToast("Coming soon")
        }

        val buttonStartJourney = root.findViewById<ImageButton>(R.id.button_start_journey)
        buttonStartJourney.setOnClickListener {
            root.context.shotToast("Coming soon")
        }
    }

    companion object {
        const val TAG = "HomeFragment"
    }
}