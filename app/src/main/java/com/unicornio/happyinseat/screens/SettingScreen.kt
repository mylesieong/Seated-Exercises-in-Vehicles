package com.unicornio.happyinseat.screens

import android.content.res.Configuration
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.material.MaterialTheme.colors
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment.Companion.TopEnd
import androidx.compose.ui.Alignment.Companion.TopStart
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.unicornio.happyinseat.ComposeAlertDialog
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

        val openDialog = remember { mutableStateOf(false) }

        if (openDialog.value) {
            ComposeAlertDialog(
                title = "Are you sure",
                description = "Remove all records",
                onPositive = {
                    deleteRecords(context)
                    context.shotToast("All records are removed")
                    openDialog.value = false
                },
                onNegative = {
                    openDialog.value = false
                },
                onDismiss = {
                    openDialog.value = false
                })
        }

        Text(
            text = "General",
            color = contentColorFor(colors.background),
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.subtitle1
        )

        Box(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = "Remove all records",
                color = contentColorFor(colors.background),
                modifier = Modifier.align(TopStart),
                style = MaterialTheme.typography.body1
            )
            Button(
                modifier = Modifier.align(TopEnd),
                colors = ButtonDefaults.buttonColors(backgroundColor = colors.primary),
                onClick = { openDialog.value = true }
            ) {
                Text(text = "Remove", color = contentColorFor(colors.primary))
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "About",
            color = contentColorFor(colors.background),
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.subtitle1
        )

        Box(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = "Rate and feedback",
                color = contentColorFor(colors.background),
                modifier = Modifier.align(TopStart),
                style = MaterialTheme.typography.body1
            )
            IconButton(
                modifier = Modifier
                    .align(TopEnd)
                    .clip(CircleShape)
                    .background(colors.primary),
                onClick = {
                    rateApp(context)
                }
            ) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_baseline_insert_comment_24),
                    contentDescription = null,
                    tint = colors.onPrimary
                )
            }

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
