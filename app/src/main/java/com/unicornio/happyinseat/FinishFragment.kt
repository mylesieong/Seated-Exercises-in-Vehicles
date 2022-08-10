package com.unicornio.happyinseat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
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

        setupBehavior(view)

        explode()
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
        button_once_more.setOnClickListener { v ->

        }

        button_finish.setOnClickListener {

        }

        button_start_journey.setOnClickListener {

        }
    }

    companion object {
        const val TAG = "FinishFragment"
    }
}