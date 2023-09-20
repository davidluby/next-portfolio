import Head from 'next/head'
import PDF from '@components/nav/PDF'

export default function papers() {
    const names = [
        'Propulsion Systems', 'Heat Sink Simulation', 'Linkage Kinematics', 'Heat Transfer of Slab'
    ]

    const files = [
        ['./misc_page/scammon_connor_luby_2b.pdf'],
        ['./misc_page/dLuby_603_project2.pdf'],
        ['./misc_page/luby_ME627_report.pdf'],
        ['./misc_page/dLuby_project1.pdf']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>Misc Projects</title>
        </Head>
        <PDF names={names} files={files} />
    </div>
      )
  }