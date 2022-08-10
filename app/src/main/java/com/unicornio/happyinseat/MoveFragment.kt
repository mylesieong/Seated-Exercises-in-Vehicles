package com.unicornio.happyinseat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.helpers.navigateSafely

class MoveFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_move, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        setupBehavior(view)
    }

    private fun setupBehavior(root: View) {
        root.findViewById<ImageButton>(R.id.button_next).setOnClickListener {
            findNavController().navigateSafely(R.id.action_moveFragment_to_finishFragment)
        }
    }

    companion object {
        const val TAG = "MoveFragment"
    }
}