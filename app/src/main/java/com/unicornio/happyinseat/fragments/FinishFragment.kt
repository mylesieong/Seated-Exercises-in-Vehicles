package com.unicornio.happyinseat.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.AnalyticsManager
import com.unicornio.happyinseat.AnalyticsManager.MY_EVENT_FINISH_EXERCISE_STRETCH
import com.unicornio.happyinseat.activities.ExerciseActivity
import com.unicornio.happyinseat.databinding.FragmentFinishBinding
import com.unicornio.toolish.utils.Utils.shotToast
import nl.dionsegijn.konfetti.core.PartyFactory
import nl.dionsegijn.konfetti.core.Position.Relative
import nl.dionsegijn.konfetti.core.emitter.Emitter
import nl.dionsegijn.konfetti.core.emitter.EmitterConfig
import nl.dionsegijn.konfetti.core.models.Shape
import java.util.concurrent.TimeUnit

class FinishFragment : Fragment() {
    private var _binding: FragmentFinishBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentFinishBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        AdManager.loadBannerAd(binding.adView)

        setupBehavior(view)

        explode()

        AnalyticsManager.logEvent(MY_EVENT_FINISH_EXERCISE_STRETCH)
    }

    private fun explode() {
        val emitterConfig: EmitterConfig = Emitter(100L, TimeUnit.MILLISECONDS).max(100)
        binding.konfettiView.start(
            PartyFactory(emitterConfig)
                .spread(360)
                .shapes(Shape.Square, Shape.Circle)
                .colors(listOf(0xfce18a, 0xff726d, 0xf4306d, 0xb48def))
                .setSpeedBetween(0f, 30f)
                .position(Relative(0.5, 0.2))
                .build()
        )
    }

    private fun setupBehavior(root: View) {
        binding.buttonBack.setOnClickListener {
            activity?.finishAfterTransition()
        }

        binding.buttonOnceMore.setOnClickListener {
            binding.loadingBar.visibility = View.VISIBLE

            activity?.let {
                AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                    it,
                    undergoActionIfShowAd = { },
                    postAction = {
                        it.finishAfterTransition()
                        startActivity(Intent(root.context, ExerciseActivity::class.java))
                    }
                )
            }
        }

        binding.buttonFinish.setOnClickListener {
            binding.loadingBar.visibility = View.VISIBLE

            activity?.let {
                AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                    it,
                    undergoActionIfShowAd = { },
                    postAction = {
                        it.finishAfterTransition()
                    }
                )
            }
        }

        binding.buttonStartJourney.setOnClickListener {
            activity?.shotToast("Coming soon!")
        }
    }

    companion object {
        const val TAG = "FinishFragment"
    }
}