
class App {
    private container: HTMLElement
    private stage: HTMLElement
    private ball: HTMLElement
    private orientationLocked: boolean = false
    private stageDimensions: object = {width: 0, height: 0}
    private ballDimensions: object = {width: 0, height: 0}
    private ballMass: number = 0.1 // 0.1 kg == 100 g
    private ballPosition: object = {x: 0, y: 0, z: 0, angle: 0}

    public constructor (container: HTMLElement) {
        this.container = container
        this.stage = container.querySelector('#stage') as HTMLElement
        this.ball = container.querySelector('.ball') as HTMLElement
        this.setup()
    }

    private setup (): void {
        // if no browser support, show message and bail.
        if (!this.browserHasSupport()) {
            this.showUnsupported()
            return
        }
        // we have browser support... continue setup.
        this.lockOrientation()
        this.measureDimensions()
        this.setupListeners()
    }

    private browserHasSupport (): boolean {
        // DeviceMotionEvent, DeviceOrientationEvent, and https are required.
        return (
            'ondeviceorientation' in window &&
            'ondevicemotion' in window &&
            location.protocol === 'http:'
        )
    }

    private showUnsupported (): void {
        const unsupported: HTMLElement = this.container.querySelector('#unsupported') as HTMLElement
        if (unsupported) {
            unsupported.classList.remove('hidden')
        }
    }

    private lockOrientation (): void {
        screen.orientation.lock('portrait').then(() => {
            this.orientationLocked = true
        }).catch(error => {
            console.error('Orientation Lock Error: ', error)
        })
    }

    private measureDimensions (): void {
        const {width: sWidth, height: sHeight} = this.stage.getBoundingClientRect()
        const {width: bWidth, height: bHeight} = this.ball.getBoundingClientRect()

        this.stageDimensions = {width: sWidth, height: sHeight}
        this.ballDimensions = {width: bWidth, height: bHeight}
    }

    private setupListeners (): void {
        window.addEventListener('deviceorientation', event => this.onDeviceOrientationEvent(event))
        window.addEventListener('devicemotion', event => this.onDeviceMotionEvent(event))
    }

    private onDeviceOrientationEvent (event: DeviceOrientationEvent): void {
        const {beta, gamma, alpha, absolute} = event
        console.log(`
            DeviceOrientation:\n
            \tBETA:\t${beta}\n
            \tALPHA:\t${alpha}\n
            \tGAMMA:\t${gamma}\n
            \tABSOLUTE:\t${absolute}\n
            \n
        `)
    }

    private onDeviceMotionEvent (event: DeviceMotionEvent): void {
        const {
            acceleration,
            accelerationIncludingGravity,
            rotationRate,
            interval
        } = event
        const {x: aX, y: aY, z: aZ} = acceleration as DeviceMotionEventAcceleration
        const {x: agX, y: agY, z: agZ} = accelerationIncludingGravity as DeviceMotionEventAcceleration
        const {beta, alpha, gamma} = rotationRate as DeviceMotionEventRotationRate

        console.log(`
            DeviceMotion:\n
            \tAcceleration:\n
            \t\tX:${aX}\n
            \t\tY:${aY}\n
            \t\tZ:${aZ}\n
            \tAcceleration Including Gravity:\n
            \t\tX:${agX}\n
            \t\tY:${agY}\n
            \t\tZ:${agZ}\n
            \tRotation Rate:\n
            \t\tBETA:${beta}\n
            \t\tALPHA:${alpha}\n
            \t\tGAMMA:${gamma}\n
            \tInterval: ${interval}\n
            \n
        `)
    }

    private moveBall (x: number, y: number, z: number, angle: number): void {
        Object.assign(this.ball.style, {
            transform: `rotate3d(${x}, ${y}, ${z}, ${angle}deg)`
        })
        // save new ball position.
        this.ballPosition = {x, y, z, angle}
    }
}

class Utils {
    public static gravity: number = 6.67408 * Math.pow(10, -11) // N * m^2 / kg ^ 2

    public static calculateBallAcceleration (angle: number, inertia: number, mass: number,
        resistance: number): number {
        const {gravity} = this
        // g = gravity
        // Θ = angle
        // I = inertia
        // m = mass
        // r = resistance
        // acceleration = g*sin(Θ) / (1 + I/mr^2)
        return (gravity * Math.sin(angle)) / (1 + (inertia / (mass * Math.pow(resistance, 2))))
    }
}

const container = document.getElementById('app-container') as HTMLElement
const app = new App(container) // eslint-disable-line @typescript-eslint/no-unused-vars
