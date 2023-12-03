import React, { useEffect, useState } from 'react'

function fortnite() {
    const [name, setName] = useState(null);

    const [stats, setStats] = useState(null);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '9be98039-b203bfb7-7a8ea1ff-da11bbf2'
        },
    };

    async function handleSubmit(e) {
        if (e.key === "Enter") {
            let id;

            await fetch('https://fortniteapi.io/v2/lookup?username=' + name,
                headers)
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log(data);
                id = data.account_id;
            })

            // AFTER ID FETCH STATS
            fetch('https://fortniteapi.io/v1/stats?account=' + id,
            headers)
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log(data);
                setStats(data);
            })
        };
    };

  return (
    <div>
        <input className="w-full border-2 rounded"
            placeholder="Search for a player"
            onChange={handleChange}
            onKeyDown={(e) => handleSubmit(e)}
            >
        </input>
        <h1>Player Stats</h1>
        {stats ?
            <div>
                <h1>{stats.name}</h1>
                <div className="grid grid-cols-4 w-full">
                    <div>
                        <h1>Solos</h1>
                        <p>Wins: {stats.global_stats.solo.placetop1}</p>
                        <p>Win Rate: {stats.global_stats.solo.winrate}</p>
                        <p>KD: {stats.global_stats.solo.kd}</p>
                        <p>Kills: {stats.global_stats.solo.kills}</p>
                        <p>Games: {stats.global_stats.solo.matchesplayed}</p>
                    </div>
                    <div>
                        <h1>Duos</h1>
                        <p>Wins: {stats.global_stats.duo.placetop1}</p>
                        <p>Win Rate: {stats.global_stats.duo.winrate}</p>
                        <p>KD: {stats.global_stats.duo.kd}</p>
                        <p>Kills: {stats.global_stats.duo.kills}</p>
                        <p>Games: {stats.global_stats.duo.matchesplayed}</p>
                    </div>
                    <div>
                        <h1>Trios</h1>
                        <p>Wins: {stats.global_stats.trio.placetop1}</p>
                        <p>Win Rate: {stats.global_stats.trio.winrate}</p>
                        <p>KD: {stats.global_stats.trio.kd}</p>
                        <p>Kills: {stats.global_stats.trio.kills}</p>
                        <p>Games: {stats.global_stats.trio.matchesplayed}</p>
                    </div>
                    <div>
                        <h1>Squads</h1>
                        <p>Wins: {stats.global_stats.squad.placetop1}</p>
                        <p>Win Rate: {stats.global_stats.squad.winrate}</p>
                        <p>KD: {stats.global_stats.squad.kd}</p>
                        <p>Kills: {stats.global_stats.squad.kills}</p>
                        <p>Games: {stats.global_stats.squad.matchesplayed}</p>
                    </div>
                </div>
            </div>
            : null
        }
    </div>
  )
}

export default fortnite