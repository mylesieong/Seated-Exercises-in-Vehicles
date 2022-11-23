package com.unicornio.happyinseat.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.unicornio.happyinseat.activities.ExerciseActivity
import com.unicornio.happyinseat.databinding.FragmentHomeBinding
import com.unicornio.toolish.utils.Utils.shotToast

class HomeFragment : Fragment() {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        setupBehavior()
    }

    private fun setupBehavior() {
        binding.buttonStartStretching.setOnClickListener {
            context?.let {
                startActivity(Intent(it, ExerciseActivity::class.java))
            }
        }

        binding.buttonStartCore.setOnClickListener {
            context?.shotToast("Coming soon")
        }

        binding.buttonStartJourney.setOnClickListener {
            context?.shotToast("Coming soon")
        }
    }

    companion object {
        const val TAG = "HomeFragment"
    }
}