package com.unicornio.happyinseat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.helpers.navigateSafely
import kotlinx.android.synthetic.main.fragment_overview.*

class OverviewFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_overview, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        setupBehavior(view)
    }

    private fun setupBehavior(root: View) {
        button_start.setOnClickListener {
            findNavController().navigateSafely(R.id.action_overviewFragment_to_moveFragment)
        }

        button_back.setOnClickListener {
            activity?.onBackPressed()
        }
    }

    companion object {
        const val TAG = "OverviewFragment"
    }
}