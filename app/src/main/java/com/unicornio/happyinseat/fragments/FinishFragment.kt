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
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.activities.ExerciseActivity
import com.unicornio.toolish.utils.Utils.shotToast
import kotlinx.android.synthetic.main.fragment_finish.*
import nl.dionsegijn.konfetti.core.PartyFactory
import nl.dionsegijn.konfetti.core.Position.Relative
import nl.dionsegijn.konfetti.core.emitter.Emitter
import nl.dionsegijn.konfetti.core.emitter.EmitterConfig
import nl.dionsegijn.konfetti.core.models.Shape
import java.util.concurrent.TimeUnit

class FinishFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_finish, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        AdManager.loadBannerAd(adView)

        setupBehavior(view)

        explode()

        AnalyticsManager.logEvent(MY_EVENT_FINISH_EXERCISE_STRETCH)
    }

    private fun explode() {
        val emitterConfig: EmitterConfig = Emitter(100L, TimeUnit.MILLISECONDS).max(100)
        konfettiView.start(
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
        button_back.setOnClickListener {
            activity?.finishAfterTransition()
        }

        button_once_more.setOnClickListener {
            activity?.finishAfterTransition()
            startActivity(Intent(root.context, ExerciseActivity::class.java))
        }

        button_finish.setOnClickListener {
            activity?.finishAfterTransition()
        }

        button_start_journey.setOnClickListener {
            activity?.shotToast("Coming soon!")
        }
    }

    companion object {
        const val TAG = "FinishFragment"
    }
}