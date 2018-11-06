import '../style/index.css'
import Link from 'next/link'

const Index = () => (
    <main>
      <h1>React Animations Example</h1>
      <p>
        <Link href="/pose">
          <a>Pose</a>
        </Link>
      </p>
      <p>
        <Link href="/wa">
          <a>Web Animations API</a>
        </Link>
      </p>
    </main>
  )

export default Index