package com.unicornio.happyinseat

val BREATH = Move(
    "Breath in and out",
    "Repeat 10 times",
    "Place your arms on the chair arms and place both feet flat on the ground. Whatever position you're in, place your feet roughly hip-width apart.\n" +
            "\n" +
            "1. Let your breath flow as deep down into your belly as is comfortable, without forcing it.\n" +
            "\n" +
            "2. Try breathing in through your nose and out through your mouth.\n" +
            "\n" +
            "3. Breathe in gently and regularly. Some people find it helpful to count steadily from 1 to 5. You may not be able to reach 5 at first.\n" +
            "\n" +
            "4. Then, without pausing or holding your breath, let it flow out gently, counting from 1 to 5 again, if you find this helpful.",
    R.drawable.animation_breath,
    "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/"
)

val NECK_ROLL = Move(
    "Neck rotation",
    "Repeat 10 times",
    "1. Keep your chin tucked down slightly and move your head slowly backward until it is pulled back as far as you can without straining or feeling any pain.\n" +
            "\n" +
            "2. Turn your head gently to the right, and then gently to the left. Remember not to strain your neck or push yourself to the point that you feel pain.\n" +
            "\n" +
            "3. Hold the stretch for 2 to 3 seconds before moving your head to the opposite side.",
    R.drawable.animation_neck_roll,
    "https://www.youtube.com/watch?v=Gv7enzI7Yq8"
)

val SHOULDER_ROTATION = Move(
    "Shoulder rotation",
    "Repeat 10 times in one direction, then 10 times in the opposite direction",
    "Sit with your feet about six inches apart pointing straight, knees in line between ankles and hips. Use the  muscles of your hip to tilt your pelvis forward to create a little bit of an arch in your lower back\n" +
            "\n" +
            "1. Now keep your arms relaxed and you are going to make big circles with your shoulders start by going up and back down.",
    R.drawable.animation_shoulder_rotation,
    "https://www.youtube.com/watch?v=fUK1GZSWEco"
)

val WRIST_ROTATION = Move(
    "Wrist rotation",
    "Repeat 1 time",
    "Rotate your wrists in one direction 10 times and then move them in the other.",
    R.drawable.animation_wrist_rotation,
    "https://www.youtube.com/watch?v=ZToQJom6fOk"
)

val LOW_BACK_STRETCH = Move(
    "Low back stretch",
    "Repeat 10 times",
    "Sit with your feet six inches apart pointing straight. Knees bent at about 90 degrees.\n" +
            "\n" +
            "1. Allow your pelvis to kind of drop back in your spine to round and bring your shoulders down and tuck your chin down towards your chest.\n" +
            "\n" +
            "2. Slowly roll the other way. Use your hip muscles to pull the pelvis forward creating an arch in the lower back bringing the shoulders back and then lengthening the spine in the neck. Don't strain your neck but just feel like you are making it long.\n" +
            "\n" +
            "3. Smoothly go back and forth between these 2 positions allowing the spine to flex and then taking it gently through extension. Make sure the hips and the spine are working together as a team. It should feel like this is a hip driven exercise and the spine is participating.",
    R.drawable.animation_low_back_stretch,
    "https://www.youtube.com/watch?v=fUK1GZSWEco"
)

val HIP_KNEE_STRETCH = Move(
    "Hip knee stretch",
    "Repeat 10 times",
    "Adjust your seat, lean back and let your lower back be comfortably supported by the seat (a lumbar pillow is preferred). \n" +
            "\n" +
            "1. Hug one knee at a time, pulling it toward your chest.\n" +
            "\n" +
            "2. Hold the pose for 10 to 30 seconds.\n" +
            "\n" +
            "3. Alternate.",
    R.drawable.animation_hip_knee_stretch,
    "https://www.healthline.com/health/deskercise"
)

val FOOT_PUMPS = Move(
    "Foot pumps",
    "Repeat 10 times",
    "1. Start with both heels on the floor and point your feet upward as high as you can\n" +
            "\n" +
            "2. put both feet flat on the floor\n" +
            "\n" +
            "3. lift your heels high, keeping the balls of your feet on the floor\n" +
            "\n" +
            "4. Repeat these 3 stages",
    R.drawable.animation_foot_pumps,
    "https://www.youtube.com/watch?v=Gv7enzI7Yq8"
)

val ANKLE_ROTATION = Move(
    "Ankle rotation",
    "Repeat 10 times",
    "1. Lift your feet, draw a circle with your toes moving one foot clockwise and the other counterclockwise at the same time. \n" +
            "\n" +
            "2. Reverse the circles, rotate in each direction for 15 seconds.",
    R.drawable.animation_ankle_rotation,
    "https://www.youtube.com/watch?v=Gv7enzI7Yq8"
)

val STANDARD_STRETCH = Exercise(
    "Standard stretching",
    listOf(
        BREATH,
        NECK_ROLL,
        SHOULDER_ROTATION,
        WRIST_ROTATION,
        LOW_BACK_STRETCH,
        HIP_KNEE_STRETCH,
        FOOT_PUMPS,
        ANKLE_ROTATION,
    )
)