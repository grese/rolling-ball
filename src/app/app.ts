
class App {
    private container: HTMLElement
    private stage: HTMLElement
    private ball: HTMLElement

    public constructor (container: HTMLElement) {
        this.container = container
        this.stage = container.querySelector('#stage') as HTMLElement
        this.ball = container.querySelector('#ball') as HTMLElement
        this.setup()
    }

    private setup (): void {
        // if no browser support, show message and bail.
        if (!this.browserHasSupport()) {
            this.showUnsupported()
            return
        }
        // we have browser support... continue setup.
        this.setupListeners()
    }

    private setupListeners (): void {
        window.addEventListener('deviceorientation', event => this.onDeviceOrientationEvent(event))
        window.addEventListener('devicemotion', event => this.onDeviceMotionEvent(event))
    }

    private browserHasSupport (): boolean {
        // DeviceMotionEvent, DeviceOrientationEvent, and https are required.
        return (
            DeviceOrientationEvent instanceof Function &&
            DeviceMotionEvent instanceof Function &&
            location.protocol === 'http:'
        )
    }

    private showUnsupported (): void {
        const unsupported: HTMLElement = this.container.querySelector('#unsupported') as HTMLElement
        if (unsupported) {
            unsupported.classList.remove('hidden')
        }
    }

    private onDeviceOrientationEvent (event: DeviceOrientationEvent): void {
        // more to come.
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
        // more to come.
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
}

const container = document.getElementById('app-container') as HTMLElement
const app = new App(container) // eslint-disable-line @typescript-eslint/no-unused-vars
