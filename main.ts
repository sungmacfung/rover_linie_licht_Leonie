function folgeLinie () {
    Rover.setALLRGB(Rover.colors(RoverColors.White))
    LinienSensor = Rover.LineTracking()
    if (LinienSensor == 2 || LinienSensor == 5) {
        Rover.Move(50)
    } else if (LinienSensor == 1 || LinienSensor == 3) {
        Rover.MotorRunDual(MotorSchnell, MotorLangsam)
    } else {
        Rover.MotorRunDual(MotorLangsam, MotorSchnell)
    }
}
function folgeLicht () {
    LichtSensor = Rover.LightTracing()
    if (LichtSensor > 750) {
        Rover.MotorRunDual(MotorSchnell, MotorLangsam)
    } else if (LichtSensor <= 250) {
        Rover.MotorRunDual(MotorLangsam, MotorSchnell)
    } else {
        Rover.Move(MotorSchnell)
    }
}
input.onButtonPressed(Button.A, function () {
    FunktionsWahl = 0
    basic.showIcon(IconNames.Happy)
})
function DatenSenden () {
    serial.writeValue("Lighttrackingsensor:", Rover.LightTracing())
}
input.onGesture(Gesture.LogoDown, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    FunktionsWahl = 3
})
input.onButtonPressed(Button.AB, function () {
    FunktionsWahl = 2
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    FunktionsWahl = 1
    basic.showLeds(`
        # . # . #
        . # # # .
        # # # # #
        . # # # .
        # . # . #
        `)
})
let LichtSensor = 0
let LinienSensor = 0
let FunktionsWahl = 0
let MotorSchnell = 0
let MotorLangsam = 0
MotorLangsam = 40
MotorSchnell = 60
FunktionsWahl = 0
basic.forever(function () {
    DatenSenden()
    if (FunktionsWahl == 0) {
        folgeLinie()
    } else if (FunktionsWahl == 1) {
        folgeLicht()
    } else if (FunktionsWahl == 2) {
        Rover.MotorRunDual(50, 50)
    } else {
        Rover.MotorStopAll(MotorActions.Stop)
    }
})
