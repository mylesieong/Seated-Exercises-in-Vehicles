package com.unicornio.happyinseat.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.askUserWhetherQuit

class ExerciseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_exercise)
    }

    override fun onBackPressed() {
        //TODO a better way is to delegate this reaction to fragment but now I can't find a clean way to retrieve the fragment instance from navController
        val controller = findNavController(R.id.nav_host_fragment)
        if (controller.currentDestination?.id == R.id.moveFragment) {
            askUserWhetherQuit(
                positiveAction = { controller.navigateUp() },
                negativeAction = {}
            )
            return
        }

        super.onBackPressed()
    }

    companion object {
        val TAG = ExerciseActivity::class.java.canonicalName
    }
}