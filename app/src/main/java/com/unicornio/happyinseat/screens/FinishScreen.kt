package com.unicornio.happyinseat.screens

import android.content.res.Configuration
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.Center
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter.Companion.tint
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.toolish.utils.Utils.shotToast
import nl.dionsegijn.konfetti.core.PartyFactory
import nl.dionsegijn.konfetti.core.Position
import nl.dionsegijn.konfetti.core.emitter.Emitter
import nl.dionsegijn.konfetti.core.emitter.EmitterConfig
import nl.dionsegijn.konfetti.core.models.Shape
import nl.dionsegijn.konfetti.xml.KonfettiView
import java.util.concurrent.TimeUnit

@Composable
fun FinishScreen(onExit: () -> Unit, onOnceMore: () -> Unit, onFinish: () -> Unit) {
    val context = LocalView.current.context
    var showLoadingBar by remember { mutableStateOf(false) }

    Box {
        Image(painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24), contentDescription = null,
            modifier = Modifier
                .padding(16.dp)
                .width(24.dp)
                .height(24.dp)
                .clickable { onExit.invoke() }
        )

        Column(modifier = Modifier.fillMaxSize(), horizontalAlignment = CenterHorizontally) {
            Text(text = "Nice work!", style = MaterialTheme.typography.h6, modifier = Modifier.padding(24.dp))

            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(MaterialTheme.colors.surface)
                    .padding(16.dp)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.ic_finish), contentDescription = null,
                    modifier = Modifier
                        .height(200.dp)
                        .width(200.dp)
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = {
                    showLoadingBar = true
                    onOnceMore.invoke()
                },
                colors = ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.secondary)
            ) {
                Row(
                    modifier = Modifier.width(240.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.ic_baseline_replay_24),
                        contentDescription = null,
                        colorFilter = tint(MaterialTheme.colors.onPrimary),
                        modifier = Modifier
                            .padding(8.dp)
                            .height(24.dp)
                            .width(24.dp)
                    )

                    Text(
                        text = "ONCE MORE",
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.subtitle2,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    showLoadingBar = true
                    onFinish.invoke()
                },
                colors = ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.primaryVariant)
            ) {
                Row(
                    modifier = Modifier.width(240.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.ic_baseline_home_24),
                        contentDescription = null,
                        colorFilter = tint(MaterialTheme.colors.onPrimary),
                        modifier = Modifier
                            .padding(8.dp)
                            .height(24.dp)
                            .width(24.dp)
                    )

                    Text(
                        text = "FINISH",
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.subtitle2,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    context.shotToast("Coming soon!")
                },
                colors = ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.primaryVariant)
            ) {
                Row(
                    modifier = Modifier.width(240.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.ic_baseline_airline_seat_recline_extra_24),
                        contentDescription = null,
                        colorFilter = tint(MaterialTheme.colors.onPrimary),
                        modifier = Modifier
                            .padding(8.dp)
                            .height(24.dp)
                            .width(24.dp)
                    )

                    Text(
                        text = "START JOURNEY",
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.subtitle2,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            val bannerUnitId = stringResource(id = R.string.AD_UNIT_ID_BANNER)

            AndroidView(
                modifier = Modifier.weight(1f),
                factory = { context ->
                    AdView(context).apply {
                        setAdSize(AdSize.MEDIUM_RECTANGLE)
                        adUnitId = bannerUnitId
                    }.also {
                        AdManager.loadBannerAd(it)
                    }
                },
                update = {}
            )
        }

        if (showLoadingBar) {
            CircularProgressIndicator(modifier = Modifier.align(Center))
        }
    }

    AndroidView(
        modifier = Modifier.fillMaxSize(), // Occupy the max size in the Compose UI tree
        factory = { context ->
            KonfettiView(context)
        },
        update = { view ->
            val emitterConfig: EmitterConfig = Emitter(100L, TimeUnit.MILLISECONDS).max(100)
            view.start(
                PartyFactory(emitterConfig)
                    .spread(360)
                    .shapes(Shape.Square, Shape.Circle)
                    .colors(listOf(0xfce18a, 0xff726d, 0xf4306d, 0xb48def))
                    .setSpeedBetween(0f, 30f)
                    .position(Position.Relative(0.5, 0.2))
                    .build()
            )
        }
    )
}

@Composable
@Preview(name = "Day Mode")
@Preview(name = "Night Mode", showBackground = true, uiMode = Configuration.UI_MODE_NIGHT_YES)
fun FinishScreenPreview() {
    ApplicationTheme {
        FinishScreen({}, {}, {})
    }
}