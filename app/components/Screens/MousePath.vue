<template>
    <div class="relative w-full h-full">
        <canvas ref="canvasRef" class="w-full h-full"> mouse path </canvas>
    </div>
</template>

<script setup lang="ts">
const mousePath = useState<{ x: number; y: number }[]>('mousePath')
const reactionTime = useState('reactionTime', () => 0)

const canvasRef = ref()

const drawMousePath = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width
    canvas.height = rect.height

    const ctx = canvas.getContext('2d')

    if (!canvas || !ctx || mousePath.value.length < 2) return

    ctx.beginPath()

    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.strokeStyle = '#2DAA8C'

    ctx.moveTo(mousePath.value[0]!.x, mousePath.value[0]!.y)

    for (const point of mousePath.value.slice(1)) {
        ctx.lineTo(point.x, point.y)
    }

    ctx.stroke()

    ctx.setLineDash([])

    const lastPoint = mousePath.value[mousePath.value.length - 1]

    ctx.beginPath()
    ctx.arc(lastPoint!.x, lastPoint!.y, 12, 0, Math.PI * 2)
    ctx.fillStyle = '#2DAA8C'
    ctx.fill()

    ctx.font = 'bold 24px system-ui'
    ctx.fillStyle = '#FFFFF0'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        `${Math.floor(Number(reactionTime.value)).toLocaleString()} ms`,
        canvas.width / 2,
        100
    )
}

onMounted(() => {
    drawMousePath()
})
</script>
