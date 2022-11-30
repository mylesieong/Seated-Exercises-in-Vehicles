package com.unicornio.happyinseat.fragments

import android.content.res.Configuration
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme.colors
import androidx.compose.material.Text
import androidx.compose.material.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment.Companion.TopEnd
import androidx.compose.ui.Alignment.Companion.TopStart
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.deleteRecords
import com.unicornio.happyinseat.helpers.rateApp
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.toolish.utils.Utils.shotToast

@Composable
fun SettingScreen() {
    val context = LocalView.current.context

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp)
    ) {
        Text(text = "General", color = contentColorFor(colors.background))

        Box(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = "Remove all records", color = contentColorFor(colors.background), modifier = Modifier.align(TopStart)
            )
            Button(modifier = Modifier.align(TopEnd), colors = ButtonDefaults.buttonColors(backgroundColor = Color.Yellow), onClick = {
                MaterialAlertDialogBuilder(context).setTitle("Are you sure?").setPositiveButton("Yes") { _, _ ->
                    deleteRecords(context)
                    context.shotToast("All records are removed")
                }.setNegativeButton("No") { dialog, _ -> dialog.cancel() }.show()
            }) {
                Text(text = "Remove", color = contentColorFor(colors.primary))
            }
        }

        Text(text = "About", color = contentColorFor(colors.background))

        Box(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = "Rate and feedback", color = contentColorFor(colors.background), modifier = Modifier.align(TopStart)
            )
            Image(painter = painterResource(id = R.drawable.ic_baseline_insert_comment_24), contentDescription = null, modifier = Modifier
                .align(TopEnd)
                .clickable {
                    rateApp(context)
                })
        }
    }

}

@Composable
@Preview(name = "Light Mode")
@Preview(
    uiMode = Configuration.UI_MODE_NIGHT_YES,
    showBackground = true,
    name = "Dark Mode"
)
fun SettingScreenPreview() {
    ApplicationTheme {
        SettingScreen()
    }
}
