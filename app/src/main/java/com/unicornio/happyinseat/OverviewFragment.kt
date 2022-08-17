package com.unicornio.happyinseat

import android.graphics.drawable.AnimationDrawable
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.MoveFragment.Companion.EXTRA_KEY_INDEX_OF_MOVE
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
            findNavController().navigateSafely(
                R.id.action_overviewFragment_to_moveFragment,
                bundleOf(
                    EXTRA_KEY_INDEX_OF_MOVE to 0
                )
            )
        }

        button_back.setOnClickListener {
            activity?.onBackPressed()
        }

        (image_breath_in_out.drawable as AnimationDrawable).start()
        (image_neck_roll.drawable as AnimationDrawable).start()
        (image_shoulder_rotation.drawable as AnimationDrawable).start()
        (image_wrist_rotation.drawable as AnimationDrawable).start()
        (image_low_back_stretch.drawable as AnimationDrawable).start()
        (image_foot_pumps.drawable as AnimationDrawable).start()
        (image_ankle_rotation.drawable as AnimationDrawable).start()
        (image_hip_knee_stretch.drawable as AnimationDrawable).start()
    }

    companion object {
        const val TAG = "OverviewFragment"
    }
}