---
title: Hide Views
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Use these APIs to exclude sensitive UI from Mobile Insights session recordings. This page uses the **VWO** (`VWOInsights`) APIs for existing VWO integrations.

A developer can either pass multiple views at once or pass each view separately. Here’s how to hide views directly from the source code:

<br />

## Android Views

```java
// pass multiple views at once
ArrayList<View> views = new ArrayList<>();
views.add(view1);
views.add(view2);
// .. and so on
VWOInsights.hideViews(views);

// or simply pass each view separately
VWOInsights.hideView(view1);
VWOInsights.hideView(view2);
// .. and so on
```
```kotlin
// pass multiple views at once
val views = ArrayList<View>()
views.add(view1)
views.add(view2)
// .. and so on
VWOInsights.hideViews(views)

// or simply pass each view separately
VWOInsights.hideView(view1)
VWOInsights.hideView(view2)
// .. and so on
```

<br />

## Jetpack Compose

For Jetpack Compose, do not wrap each composable in an `AndroidView`. Apply the masking modifier on the sensitive composable. Pass a **unique** `id` for each composable (do not reuse the same id on multiple nodes) and pass `LocalView.current` as `localView`.

```kotlin
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalView
import com.vwo.insights.exposed.maskComposableForVwo

@Composable
fun PaymentForm() {
    val localView = LocalView.current
    var cardNumber by remember { mutableStateOf("") }

    OutlinedTextField(
        value = cardNumber,
        onValueChange = { cardNumber = it },
        label = { Text("Card Number") },
        modifier = Modifier
            .fillMaxWidth()
            .maskComposableForVwo(
                id = "payment_card_number",
                localView = localView
            ),
        singleLine = true
    )
}
```
