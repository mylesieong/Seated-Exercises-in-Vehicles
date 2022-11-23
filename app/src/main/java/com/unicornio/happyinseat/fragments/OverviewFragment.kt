package com.unicornio.happyinseat.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.AnalyticsManager
import com.unicornio.happyinseat.AnalyticsManager.MY_EVENT_START_EXERCISE_STRETCH
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.databinding.FragmentOverviewBinding
import com.unicornio.happyinseat.fragments.MoveFragment.Companion.EXTRA_KEY_INDEX_OF_MOVE
import com.unicornio.happyinseat.helpers.navigateSafely

class OverviewFragment : Fragment() {
    private var _binding: FragmentOverviewBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentOverviewBinding.inflate(inflater, container, false)
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
        binding.buttonStart.setOnClickListener {
            findNavController().navigateSafely(
                R.id.action_overviewFragment_to_moveFragment,
                bundleOf(
                    EXTRA_KEY_INDEX_OF_MOVE to 0
                )
            )

            AnalyticsManager.logEvent(MY_EVENT_START_EXERCISE_STRETCH)
        }

        binding.buttonBack.setOnClickListener {
            activity?.finishAfterTransition()
        }

//        (binding.imageBreathInOut.drawable as AnimationDrawable).start()
//        (binding.imageNeckRoll.drawable as AnimationDrawable).start()
//        (binding.imageShoulderRotation.drawable as AnimationDrawable).start()
//        (binding.imageWristRotation.drawable as AnimationDrawable).start()
//        (binding.imageLowBackStretch.drawable as AnimationDrawable).start()
//        (binding.imageFootPumps.drawable as AnimationDrawable).start()
//        (binding.imageAnkleRotation.drawable as AnimationDrawable).start()
//        (binding.imageHipKneeStretch.drawable as AnimationDrawable).start()
    }

    companion object {
        const val TAG = "OverviewFragment"
    }
}