import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EraView() {
  const [dateInput, setDateInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [narratives, setNarratives] = useState([]);

  const handleSubmit = () => {
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(dateInput);
  const matches = [];

  if (isDate) {
    // Exact date match
    Object.entries(specificEvents).forEach(([date, event]) => {
      if (date === dateInput) {
        matches.push(event);
      }
    });

    // Date range (period match)
    const dateObj = new Date(dateInput);
    generalPeriods.forEach((p) => {
      if (dateObj >= new Date(p.start) && dateObj <= new Date(p.end)) {
        matches.push({ title: p.title, narrative: p.narrative, image: p.image });
      }
    });

    if (matches.length > 0) {
      setNarratives(matches);
      return;
    }
  }

  // Keyword search
  const keywordMatches = Object.values(specificEvents).filter(event =>
    event.keywords?.some(kw =>
      kw.toLowerCase().includes(keywordInput.toLowerCase())
    )
  ).concat(
    generalPeriods.filter(p =>
      p.keywords?.some(kw =>
        kw.toLowerCase().includes(keywordInput.toLowerCase())
      )
    ).map(p => ({ title: p.title, narrative: p.narrative, image: p.image }))
  );

  if (keywordMatches.length > 0) {
    setNarratives(keywordMatches);
    return;
  }

  setNarratives([{
    title: 'No Data Found',
    narrative: "Sorry, we don't have a POV story for this date or topic yet.",
  }]);
};


  return (
    <div className="container">
      <div className="header" style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.2em' }}>
        Echoes of History
      </h1>
      <p style={{ fontSize: '1rem', color: '#ccc', marginTop: 0 }}>
        Every era has a story—step into it. <br />
        Search a date. Enter the scene.
      </p>
    </div>


      <div style={{ marginBottom: '20px' }}>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          style={{ marginRight: '10px', padding: '0.5em', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Search topic (e.g., Lincoln, WW2)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          style={{ marginRight: '10px', padding: '0.5em', width: '300px' }}
        />
        <button onClick={handleSubmit}>See Scene</button>
      </div>

      {narratives.length > 0 && narratives[0].title !== 'No Data Found' ? (
        narratives.map((narrative, idx) => (
          <motion.div
            key={idx}
            className="story-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <h2>{narrative.title}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {narrative.image && (
                <img
                  src={narrative.image}
                  alt={narrative.title}
                  style={{
                    maxWidth: '250px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}
              <p style={{ flex: 1 }}>{narrative.narrative}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="no-data">
          <h2>No Data Found</h2>
          <p>Sorry, we don't have a POV story for this date or topic yet.</p>
        </div>
      )}
    </div>
  );
}



const specificEvents = {
  '1492-10-12': {
    title: "Columbus Arrives in the Americas",
    narrative: "October 12, 1492. You're aboard the Santa María, and land finally comes into view—lush, untouched terrain under a cloudless sky.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg/1200px-Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg",
    keywords: ['Christopher Columbus', 'Native America', 'colonization', 'exploration', 'columbus']
  },

  '1763-05-07': {
  title: "Pontiac's Rebellion Begins",
  narrative: "It's 1763. You've just heard the drumbeats of war echo through the Great Lakes. Pontiac, an Ottawa leader, is rallying tribes to resist British expansion. Forts are under siege. Frontier settlers brace themselves, unsure whether they'll see another sunrise.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvi9EjrUbskffJs3NodGaMI0pBVhqNGDvzAQ&s',
  keywords: ['pontiac', 'rebellion', 'native', 'british colonies', 'colonization', 'colonial', 'colonization']
},

  '1776-07-04': {
  title: 'Declaration of Independence Signed',
  narrative: "July 4, 1776. You’re in Philadelphia, in the humid air of the Pennsylvania State House. The room buzzes with tension as the final signatures are laid down. A new nation is born—not with fireworks, but with ink and intent.",
  image: 'https://news.virginia.edu/sites/default/files/article_image/uva_obscura_declaration_da_header_3-2_0.jpg',
  keywords: ['Thomas Jefferson', 'Father', 'Founding Father', 'Independence Day', "July", "4th", "1776", "James Madison", "George Washington", "Philadelphia", "Pennsylvania", "Ben Franklin", "Benjamin Franklin", "Declaration of Independence", "America", "United States", "Independence", "United States of America", "United States", "America"]
  },
  '1777-11-15': {
  title: 'Articles of Confederation Drafted',
  narrative: "November 15, 1777. You’re in the Continental Congress as the first U.S. government framework is signed off. It’s a fragile blueprint—loose unity, no strong central power—but it’s a start. The war still rages, but the colonies now have something that resembles a government.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3LojO245v3ZXFlYx1ujcQWEcZj6XZXlIMg&s',
  keywords: ['states', 'articles of confederation', 'constitution', 'thomas jefferson', 'founding fathers', 'james madison']
},
'1787-09-17': {
  title: 'U.S. Constitution Signed',
  narrative: "September 17, 1787. You’re in Independence Hall in Philadelphia. After months of heated debate, the Constitution is signed. The delegates are exhausted but hopeful—this is a bold new plan for a republic built to last.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9hjYTscp7SMd2xHcn5cETBZLlk-zAcG3UA&s',
  keywords: ['Constitution', 'thomas jefferson', 'founding fathers', 'george washington', 'james madison']
},
'1787-10-27': {
  title: 'Federalist Papers Published',
  narrative: "October 27, 1787. You’re reading a crisp New York newspaper as ‘Publius’ makes his case. Hamilton, Madison, and Jay launch a bold defense of the new Constitution—one essay at a time. It’s propaganda with brains, and it just might hold the union together.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcyBLookzIPIvW84VrqMAeV_ECvY-02bP1A&s',
  keywords: ['Alexander Hamilton', 'Federalist Papers', 'United States Constitution', 'founding fathers']
},

'1791-12-15': {
  title: 'Bill of Rights Ratified',
  narrative: "December 15, 1791. You’re standing outside a statehouse as the first ten amendments to the Constitution become law. The ink affirms freedoms of speech, religion, and due process. The people now have a shield—and the government a leash.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsL_NLUC2_0kjxzSycL4R_hr3adxiKe_tzTw&s',
  keywords: ['Bill of Rights', 'Amendment', 'thomas jefferson', 'founding fathers', 'george washington']
},

'1798-07-14': {
  title: 'Alien and Sedition Acts Passed',
  narrative: "You're a newspaper editor in 1798, feeling the noose tighten. Under President John Adams, Congress passes laws targeting immigrants and muzzling dissent. Say the wrong thing, and you're jailed. In the young republic, free speech is already on trial.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTIziPHTg9nFcWHUKgoTR21IQshWvUpzMA&s',
  keywords: ['alien and sedition acts', 'john adams', 'first amendment', 'immigration', 'free speech', 'Thomas Jefferson', "Jamed Madison"]
},


'1803-02-24': {
  title: 'Marbury v. Madison Decided',
  narrative: "February 24, 1803. You’re inside the Supreme Court chambers. Chief Justice John Marshall delivers a decision that forever alters the balance of power—establishing the Court’s authority to strike down unconstitutional laws. Judicial review is born.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIIO7qsy0dP7NGWFSmjWapcDp1fz-doepjzw&s',
  keywords: ['James Madison', 'Marbury', 'John Marshall', 'Marbury v. Madison', 'SCOTUS', 'supreme court']
},

'1803-04-30': {
  title: 'Louisiana Purchase Signed',
  narrative: "You're in awe as a map of the United States doubles overnight. Jefferson brokers a deal with Napoleon, buying 828,000 square miles of French territory for $15 million. Farmers dream of new frontiers. The future is westward—and vast.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBu9Cd2YysCW4JTIHJ2b7RdpLMDUbD1kV5Q&s',
  keywords: ['louisiana purchase', 'jefferson', 'napoleon', 'manifest destiny', '1803', 'westward expansion']
},


'1804-07-11': {
  title: 'Hamilton Killed by Aaron Burr',
  narrative: "July 11, 1804. Dawn breaks over Weehawken. You’re part of a small, tense gathering. Two political giants take ten paces—then one falls. Vice President Aaron Burr shoots Alexander Hamilton in a duel that stuns the nation and ends a founding father’s life.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScE8UKMVZSxTA-6rWLWWbU-MKkDTK5jC_juQ&s',
  keywords: ['Alexander Hamilton', 'Aaron Burr', 'duel']
},

'1823-12-02': {
  title: 'Monroe Declares the Western Hemisphere Off-Limits',
  narrative: "You’re in Congress on December 2, 1823. President James Monroe steps up, calm but firm. His message? Europe must stay out of the Americas. Colonization is dead. Interference won’t be tolerated. The crowd is silent, realizing this is a turning point — the U.S. just claimed guardianship over the Western Hemisphere. It’s not isolationism anymore — it’s quiet dominance.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZUNCXpMr7aVOq0usDYS8rl0C_uUdH2D629A&s',
  keywords: ['monroe doctrine', 'james monroe', 'foreign policy', 'european powers', 'latin america', 'non-colonization']
},

'1857-03-06': {
  title: 'Dred Scott v. Sandford Decision',
  narrative: "March 6, 1857. You sit in stunned silence as the Supreme Court declares that Black Americans, free or enslaved, cannot be U.S. citizens. Dred Scott’s plea for freedom is denied. The ruling ignites fury across the North and deepens the divide that will lead to civil war.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnsRWTWE1gOMP933xpZmN1RebZITA-LnVzw&s',
  keywords: ['Sanford', 'slave', 'SCOTUS', 'Supreme Court', 'Dred Scott', 'Dred Scott v. Sandford']
},

  '1860-11-06': {
  title: 'Lincoln Elected President (1st Time)',
  narrative: "November 6, 1860. You’re in a crowded polling place in Illinois, tensions high. Lincoln, the first Republican president, wins despite deep national divisions—and the country braces for what’s next.",
  image: 'https://firstamendment.mtsu.edu/wp-content/uploads/sites/2/2023/06/Abraham_Lincoln_November_1863_0.jpg',
  keywords: ['Abraham Lincoln', 'Confederate', 'Black', 'Union', 'civil war']
},
  '1861-04-12': {
  title: 'Civil War Begins',
  narrative: "April 12, 1861. You're standing near Fort Sumter as Confederate forces open fire. Smoke fills the air as the first shots of the American Civil War echo across the Charleston harbor.",
  image: 'https://aaregistry.org/wp-content/uploads/2009/09/Civil-War-Begins.jpg',
  keywords: ['Abraham Lincoln', 'Confederate', 'Black', 'Union', 'civil war']
},
'1863-01-01': {
  title: 'Emancipation Proclamation Issued',
  narrative: "Lincoln signs the order. You're an enslaved person in the Confederacy, hearing whispers of freedom. Union soldiers carry copies. The proclamation doesn’t free everyone — but it's a turning point.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdR3q4w_Rr6OAdq7HQUQYuyWx6_1-1xl-bA&s',
  keywords: ['emancipation', 'civil war', 'lincoln', 'union', 'slave', 'freedom']
},

'1863-07-01': {
  title: 'Battle of Gettysburg Begins',
  narrative: "July 1, 1863. You stand on a Pennsylvania ridge as cannon fire splits the air. Union and Confederate forces clash in a brutal three-day fight that will decide the war’s momentum. Smoke chokes the fields. Bodies line the hills. Gettysburg isn’t just a turning point—it’s a graveyard of American ambition.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXVkkpfHCsaIaLPabvYOOOGdDjbcK4fPl2zA&s',
  keywords: ['Abraham Lincoln', 'Confederate', 'Black', 'Union', 'slave', 'battle of gettysburg', 'civil war']
},

'1864-11-08': {
  title: 'Lincoln Re-elected',
  narrative: "November 8, 1864. Despite a nation torn apart, Lincoln wins re-election. You're in a candle-lit room reading the newsprint, where hope flickers that this war might soon end—with unity.",
  image: 'https://www.battlefields.org/sites/default/files/styles/social_media/public/The%20True%20Issue%20of%20%2522Thats%20Whats%20the%20Matter.%2522.jpg.webp?itok=WqM-xO7s',
  keywords: ['Abraham Lincoln', 'Confederate', 'Black', 'Union', 'slave', 're-elected']
},

'1865-04-09': {
  title: 'Civil War Ends',
  narrative: "April 9, 1865. At Appomattox Court House, General Lee surrenders to Grant. You're among weary soldiers laying down arms, some embracing, others silent, as the war that shattered a nation ends.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuJNrc_Q3bOWVrYsTTCgruhKZ9AA2fi89yZg&s',
  keywords: ['Abraham Lincoln', 'Confederate', 'Black', 'Union', 'slave', 'African American', 'civil war']
},
  '1865-04-15': {
    title: "Lincoln's Assassination",
    narrative: "April 15, 1865. You wake to devastating news—President Abraham Lincoln has been shot. The streets of Washington are gripped by mourning.",
    image: "https://constitutingamerica.org/wp-content/uploads/2020/05/LincolnAsntnCurrierIves1865.jpg",
    keywords: ['Ford Theater', 'Gun','John Wilkes Booth', 'Sic Simper Tyrannis', 'Lincoln', 'Confederate', 'Union', 'slave']
  },

  '1865-12-06': {
  title: '13th Amendment Ratified',
  narrative: "The ink dries. Slavery is abolished. You're a freedman hearing the news for the first time — cautious, unsure if the words on paper will hold in your town. The war is over, but the fight for equality is not.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGiMzZJNn9x6ZHHODWRV-ApkkyKrkNivcW5Q&s',
  keywords: ['13th amendment', 'slavery', 'freedom', 'lincoln', 'union', 'African American', 'black', 'ratified']
  },

  '1917-04-06': {
    title: 'U.S. Enters World War I',
    narrative: "You’re in New York, 1917. The newspapers scream 'WAR!' as President Wilson takes the podium. 'The world must be made safe for democracy,' he says. Draft boards are formed. Young men line up. You never thought the war 'over there' would reach you — but now you're shipping out.",
    image: 'https://tile.loc.gov/storage-services/service/pnp/ppmsc/03500/03521r.jpg',
    keywords: ['ww1', 'world war','Woodrow Wilson', 'Europe']
  },

  '1918-11-11': {
    title: 'Armistice Day: The War Ends',
    narrative: "In a small Midwestern town, church bells ring out at dawn. Your brother is still in France. Letters say the trenches are hell, but now it’s over. America held the line. You wave a flag in the street, unsure if he’ll ever come home the same.",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hJoj133vE779uYV6LaI_w5xBeZhzuvGrNg&s',
    keywords: ['ww1', 'world war', 'wilson', 'armistice']
  },

  '1920-08-26': {
  title: '19th Amendment Ratified: Women Win the Vote',
  narrative: "It’s August 26, 1920. You're holding a newspaper in one hand and a suffrage banner in the other. After decades of marches, hunger strikes, jail time, and relentless organizing, women have won the vote. The 19th Amendment is now law. Susan B. Anthony didn’t live to see this day, but her fight echoes in every ballot cast by a woman. The political map of America is forever changed.",
  image: 'https://my.lwv.org/sites/default/files/delaware/files/equality.jpg',
  keywords: ['women\'s suffrage', '19th amendment', 'vote', '1920', 'susan b. anthony', 'elizabeth cady stanton', 'right to vote', 'women voting', 'ratified']
},

  '1933-03-04':{
  title: 'FDR’s First Inaugural Address',
  narrative: "March 4, 1933. You’re packed into the crowd in front of the U.S. Capitol. The country is paralyzed by bank failures, unemployment, and despair. Franklin D. Roosevelt takes the podium and declares: 'The only thing we have to fear is fear itself.' A wave of cautious hope ripples through the nation.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTjaH-SWdB5Tz4F2MvxHFGNhQ11y6-LYQeQ&s',
  keywords: ['fdr', 'roosevelt', 'first inaugural address', 'fear itself', 'great depression', '1933', 'hope', 'new deal']
 },


  '1941-12-07': {
  title: 'Attack on Pearl Harbor',
  narrative: "You’re listening to a Sunday ball game on the radio. Then it cuts: 'Pearl Harbor has been attacked.' In an instant, your country is at war. You enlist the next day, and your parents hang a blue star in the window.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSwK4cDmTqzjIKghv2dpV4NBETnXYq_bufA&s',
  keywords: ['ww2', 'world war', 'japan', 'japanese', 'japan', 'Roosevelt', 'FDR', 'pearl harbor']
},

'1944-06-06': {
  title: 'D-Day: Invasion of Normandy',
  narrative: "You're in a Higgins boat, waves crashing, bullets hissing past. Omaha Beach. This is what you trained for. America is cracking Hitler’s Atlantic Wall open — one body at a time.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3vbFhcC4Br0weTJ1uzMCjWppg8LBbPNRQg&s',
  keywords: ['ww2', 'world war', 'holocaust', 'hitler', 'poland', 'germany', 'fdr', 'd-day', 'normandy']
},

'1945-08-06': {
  title: 'Atomic Bomb Dropped on Hiroshima',
  narrative: "You're working at Los Alamos or reading the classified headlines. The U.S. has unleashed something unimaginable. The war may end, but the nuclear age has begun — and you helped build it.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkoXT7HBtFKVeB4NFCMEs5bsARMJQ8NNIrw&s',
  keywords: ['hiroshima', 'nuclear', 'nagasaki', 'japan', 'Oppenheimer', 'roosevelt', 'fdr', 'ww2', 'world war', 'atom bomb']
},

'1945-09-02': {
  title: 'Victory Over Japan',
  narrative: "Your father’s in uniform on the deck of the USS Missouri. The Japanese sign the surrender. After years of war, blackouts, and ration books — peace finally arrives. You're 19. You made it home.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7-wRJ2QoGV5Nb9NjjiwsBrQ4V4kK7PbANg&s',
  keywords: ['hiroshima', 'nuclear', 'nagasaki', 'japan', 'Oppenheimer', 'roosevelt', 'fdr']
},

  '1954-05-17': {
  title: 'Brown v. Board of Education Ruling',
  narrative: "May 17, 1954. You’re standing outside the Supreme Court. A unanimous decision rings out—'Separate but equal' has no place in American schools. The era of legally sanctioned segregation is shattered. The Civil Rights Movement surges forward.",
  image: 'https://cdn.britannica.com/25/91825-050-6828171F/George-EC-Hayes-Thurgood-Marshall-court-James-May-17-1954.jpg',
  keywords: ['SCOTUS', 'Supreme Court', 'Brown', 'desegregation', 'black', 'civil rights', 'African American']
  },

  '1955-08-28': {
  title: 'Murder of Emmett Till',
  narrative: "You're in Mississippi, summer of ’55. A boy from Chicago has been lynched for allegedly whistling at a white woman. The photo of his open casket hits every paper. The world will never unsee it.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcnxh0DJmwUabLGCs41Oq2o4gOPuHfs65s4Q&s',
  keywords: ['emmett till', 'lynching', 'civil rights', 'terror', 'black', 'african american']
  },

  '1955-12-01': {
  title: 'Rosa Parks Sparks Montgomery Bus Boycott',
  narrative: "December 1, 1955. You’re sitting behind Rosa Parks on a Montgomery bus. When she refuses to give up her seat to a white man, the tension is electric. She's arrested—but her quiet resistance ignites a year-long boycott and fuels the modern Civil Rights Movement.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTYNAdOb1FWdz6M9poKZk-6nlMWDjwnyuTXg&s',
  keywords: ['Montgomery Bus', 'Rosa Parks']
},

'1963-08-28': {
  title: "MLK's 'I Have a Dream' Speech",
  narrative: "You’re on the National Mall. The air is heavy with heat and hope. Martin Luther King Jr. steps to the podium. His voice soars: 'I have a dream...' You believe it. You feel it. The movement grows stronger.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJmxGVrGBCb3GyfBEC3FyHrlSQnfF1qzjcA&s',
  keywords: ['mlk', 'dream', 'march on washington']
},

  '1963-11-22': {
  title: 'Assassination of President Kennedy',
  narrative: "November 22, 1963. You're on the streets of Dallas, Texas, as the presidential motorcade rolls by. Suddenly, shots ring out. Chaos erupts. President John F. Kennedy has been fatally shot—America is paralyzed by grief and disbelief.",
  image: 'https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/517330536_abkuba?_a=BAVAZGDX0',
  keywords: ['JFK', 'Kennedy', 'Dallas', 'assassination']
  },

  '1964-07-02': {
  title: 'Civil Rights Act of 1964 Signed into Law',
  narrative: "You're inside the White House on July 2, 1964. President Lyndon B. Johnson leans forward and signs the Civil Rights Act. Flashbulbs pop. History shifts. Segregation in public spaces, schools, and employment — officially outlawed. It's not the end of racism, but it's a seismic legal blow against it. Dr. King watches, knowing this is the product of marches, jail cells, fire hoses, and unshakable will.",
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVxKt69xROpTUI-qgQVyMKKbI8ojGRWL4pA&s',
  keywords: ['civil rights', '1964', 'civil rights act', 'lbj', 'lyndon johnson', 'segregation', 'martin luther king']
},

  '1968-04-04': {
  title: 'Martin Luther King Jr. Assassinated',
  narrative: "April 4, 1968. You're in Memphis when news breaks—Dr. King has been shot while standing on the balcony of the Lorraine Motel. Rage and grief spread across the nation. The voice of peaceful resistance is silenced, but the fight for justice roars louder.",
  image: 'https://assets.aclu.org/live/uploads/2019/09/web17-mlkamericanflag-1160x768-800x533.jpg',
  keywords: ['MLK', 'King', 'Memphis', 'Tennessee','assassination', 'martin luther king jr.']
},

  '1969-07-20': {
    title: "Apollo 11 Moon Landing",
    narrative: "July 20, 1969. You stare at the black-and-white screen as Neil Armstrong steps onto the Moon—'One small step for man…'",
    image: "https://i.natgeofe.com/k/1ef0d42f-adf7-49e7-a2de-7d381fd18f95/moon-landing-textimage_4x3.png",
    keywords: ['Apollo 11', 'moon', 'Neil Armstrong']
  },

'1973-01-22': {
  title: 'Roe v. Wade Legalized Abortion',
  narrative: "You're a young woman waking up in 1973 to news that the Supreme Court just ruled in your favor. For the first time, the government acknowledges your constitutional right to make decisions about your own body. The phone rings — your friend is crying on the line, not from fear this time, but relief. The streets buzz with protests and praise. America just crossed a line — one that will define political battles and personal freedom for decades to come.",
  image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2018_23/1907051/170218-allred-mccorvey-supreme-court-cb-1619.jpg',
  keywords: ['roe', 'abortion', 'reproductive rights', 'supreme court', '1973', 'wade']
 },

  '1989-11-09': {
    title: "Fall of the Berlin Wall",
    narrative: "November 9, 1989. You stand in the crowd, watching sledgehammers hit concrete. East meets West in a roar of freedom.",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTBDUZ5r4fV3P7oVkOtIbdKXDUYAGn_NiEAJbiP60KDLgOT0Jt7-rZVMtsQz1-Gv54SQtfN0Z4-ElbA62oL7WCYVHqSNScBfg",
    keywords: ['Russia', 'USSR', 'Soviet', 'east', 'west', 'berlin', 'wall', '1989', 'germany']
  },
  '1998-12-19': {
    title: 'Bill Clinton Impeached',
    narrative: "December 19, 1998. You’re watching the TV in stunned silence as the U.S. House votes to impeach Clinton for perjury and obstruction. The nation's political culture takes a dramatic hit.",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vJK-wYzNVFsq5X36p2RY5KmZnyBRPBnjzA&s',
    keywords: ['Bill Clinton', 'Impeached', 'perjury']
  },
  '2001-09-11': {
    title: "9/11 Terrorist Attacks",
    narrative: "September 11, 2001. Smoke pours from the towers. Chaos unfolds as the world watches in horror and disbelief.",
    image: 'https://c.files.bbci.co.uk/76DD/production/_133692403_twintowers.jpg',
    keywords: ['September 11, 2001', "twin towers", "World Trade Center", 'terror', '9\/11']
  },
  '2020-03-11': {
    title: "COVID-19 Declared a Pandemic",
    narrative: "March 11, 2020. You hear the announcement—COVID-19 is now a global pandemic. Streets empty, masks go on, the world slows.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILPAiUJI68_BPCo4GLLWes8tz_SL_Hmw2dA&s",
    keywords: ['COVID-19', '2020', 'pandemic']
  }
};

const generalPeriods = [
  {
    start: '1492-10-12',
    end: '1754-05-27',
    title: 'Early Colonization',
    narrative: "You're among the first European settlers, braving an untamed continent. Exploration, trade, and early colonial struggles shape a new world.",
    keywords: ['colonial', 'settlers', 'colony', 'early america', 'exploration']
  },
  {
    start: '1754-05-28',
    end: '1763-02-10',
    title: 'French and Indian War',
    narrative: "Across colonial America, you're caught between French troops, British forces, and Native alliances. The war rages from forests to forts, shaping the map of North America and setting the stage for revolution.",
    keywords: ['french and indian war', 'seven years war', 'fort necessity', 'george washington']
  },
  {
  start: '1763-02-11',
  end: '1783-09-03',
  title: 'American Revolution',
  narrative: "You're in a tavern in Boston, overhearing whispers of rebellion. The Stamp Act enrages, the Boston Tea Party ignites, and by 1776, the colonies declare independence. Muskets crack at Lexington and Yorktown seals the deal—America is born in fire.",
  keywords: ['american revolution', 'declaration of independence', 'boston tea party', 'lexington', 'yorktown', 'thomas jefferson', 'george washington']
},

{
  start: '1783-09-04',
  end: '1789-03-03',
  title: 'From Articles to Constitution',
  narrative: "The war is over—but unity is fragile. You're watching Congress fumble under the Articles of Confederation. Shays’ Rebellion breaks out. Then, in Philly, a new framework takes shape: the U.S. Constitution. The experiment begins, again.",
  keywords: ['articles of confederation', 'constitutional convention', 'constitution', 'shays rebellion', 'founding fathers']
},

{
  start: '1789-03-04',
  end: '1812-06-17',
  title: 'Washington’s Presidency & the Early Republic',
  narrative: "The ink is dry. You're witnessing the rise of American institutions. Washington steps down with grace. Political parties clash. Jefferson and Hamilton duel in ideology. Foreign powers loom—and the Republic prepares for its first real war.",
  keywords: ['washington', 'hamilton', 'jefferson', 'early republic', 'neutrality', 'john adams', 'democratic-republicans', 'federalists']
},

  {
    start: '1812-06-18',
    end: '1815-02-18',
    title: 'War of 1812',
    narrative: "You’re caught between redcoats and revolutionaries—again. British forces torch the White House, militias scramble across the frontier, and Native nations fight to defend their lands. It’s the war nobody fully expected, but one that will shape America’s military identity and anthem.",
    keywords: ['war of 1812', 'andrew jackson', 'british invasion', 'star spangled banner']
  },
  {
    start: '1815-02-19',
    end: '1830-05-27',
    title: 'Early National Expansion',
    narrative: "You're part of a young nation pushing westward—building canals, launching reform movements, and debating slavery’s future.",
    keywords: ['expansion', 'westward', 'era of good feelings', 'monroe doctrine', 'manifest destiny']
  },
  {
    start: '1830-05-28',
    end: '1838-12-31',
    title: 'Trail of Tears',
    narrative: "You're standing beside a caravan of Cherokee families in 1838, their belongings packed in wagons, their eyes hollow with exhaustion. The Indian Removal Act passed in 1830 set this cruel journey in motion. Now, under military escort, thousands are forced west from their ancestral lands in the Southeast to unfamiliar territory in Oklahoma. The cold bites, disease spreads, and children cry for water. Nearly a quarter will not survive. This is not migration — it's displacement, driven by politics, greed, and betrayal.",
    keywords: ['indian removal act', 'andrew jackson', 'cherokee', 'relocation', 'oklahoma', 'manifest destiny']
  },
  {
    start: '1839-01-01',
    end: '1846-04-24',
    title: 'Antebellum Expansion',
    narrative: "Railroads stretch west, cotton dominates the South, and reformers fight for temperance and abolition. Tensions build.",
    keywords: ['antebellum', 'reform movements', 'texas annexation', 'slavery debate', 'manifest destiny', 'cotton']
  },
  {
    start: '1846-04-25',
    end: '1848-02-02',
    title: 'Mexican-American War',
    narrative: "1846 to 1848. You're a young soldier marching south. Texas is contested, California is gold-laden rumor, and Manifest Destiny has taken on deadly meaning. This war will redraw borders and fuel tensions over slavery.",
    keywords: ['mexican war', 'manifest destiny', 'treaty of guadalupe hidalgo', 'texas', 'california`s gold rush', 'manifest destiny']
  },

 {
  start: '1848-02-03',
  end: '1852-12-31',
  title: 'Compromise and Crisis',
  narrative: "The U.S. attempts to calm tensions through legislative deals like the Compromise of 1850. But the Fugitive Slave Act stirs outrage in the North, and hopes for unity start to crack.",
  keywords: ['compromise of 1850', 'fugitive slave act', 'millard fillmore', 'slavery', 'sectionalism']
},

{
  start: '1853-01-01',
  end: '1857-03-05',
  title: 'Bleeding Kansas and Political Upheaval',
  narrative: "Violence erupts in Kansas as pro- and anti-slavery settlers clash. The nation watches in horror. Meanwhile, the political landscape shifts with the collapse of the Whigs and rise of the Republicans.",
  keywords: ['bleeding kansas', 'kansas-nebraska act', 'stephen douglas', 'republican party', 'border ruffians']
},

{
  start: '1857-03-06',
  end: '1860-11-05',
  title: 'Dred Scott and the Road to Secession',
  narrative: "The Supreme Court’s Dred Scott decision sends shockwaves through the nation, effectively denying Black people citizenship. Lincoln emerges on the national stage, and Southern states talk openly of secession.",
  keywords: ['dred scott', 'lincoln', 'john brown', 'harpers ferry', 'secession']
},

  {
    start: '1860-11-06',
    end: '1865-04-15',
    title: 'A Nation at War with Itself',
    narrative: "The country fractures overnight. States secede, brothers take up arms against each other, and blood soaks battlefields from Antietam to Gettysburg. You live in a time of letters and telegrams, rationed bread, and whispered hopes. Lincoln leads with steady resolve. By the end, slavery is abolished, but the scars run deep—and a president falls just as peace arrives.",
    keywords: ['civil war', 'lincoln', 'emancipation proclamation', 'gettysburg', 'confederacy']
  },
  {
    start: '1865-04-16',
    end: '1877-03-04',
    title: 'Reconstruction Era',
    narrative: "Slavery ends but struggle begins. You're rebuilding lives, cities, and a shattered nation. Rights are gained—then stripped back.",
    keywords: ['reconstruction', 'freedmen', '13th amendment', '14th amendment', '15th amendment']
  },
  {
    start: '1877-03-05',
    end: '1914-07-27',
    title: 'Industrial Gilded Age & Reform',
    narrative: "Smoke fills the sky as railroads, factories, and skyscrapers rise. You're part of a booming—and broken—industrial age.",
    keywords: ['gilded age', 'robber barons', 'industrial revolution', 'labor unions', 'progressivism']
  },
  {
  start: '1914-07-28',
  end: '1918-11-11',
  title: 'World War I',
  narrative: "You're in a muddy trench in France, surrounded by barbed wire, mustard gas, and the constant echo of artillery. The world is locked in a brutal conflict—'the war to end all wars.'",
  keywords: ['ww1', 'trenches', 'allies', 'central powers', 'armistice', 'woodrow wilson', 'treaty of versailles']
},
{
  start: '1929-10-29',
  end: '1939-09-01',
  title: 'The Great Depression',
  narrative: "You're standing in a breadline, coat pulled tight against the wind. Banks have collapsed, jobs are gone, and the American Dream feels like a ghost. But a radio crackles with Roosevelt’s voice—hope is still alive.",
  keywords: ['great depression', 'stock market crash', 'dust bowl', 'roosevelt', 'new deal', 'hooverville']
},
{
  start: '1939-09-01',
  end: '1945-09-02',
  title: 'World War II',
  narrative: "You’re watching the skies darken as war erupts again. Rations, draft cards, and radio bulletins become daily life. From Pearl Harbor to D-Day, the world fights to decide its future.",
  keywords: ['ww2', 'hitler', 'd-day', 'pearl harbor', 'holocaust', 'allies', 'axis', 'atomic bomb']
},

{
  start: '1947-03-12',
  end: '1957-12-31',
  title: 'Early Cold War & McCarthyism',
  narrative: "The world divides into East and West. The U.S. enacts the Truman Doctrine, while Senator McCarthy sparks a Red Scare at home—accusing officials of communism as paranoia grips the nation.",
  keywords: ['cold war', 'mccarthy', 'truman doctrine', 'iron curtain', 'red scare']
},

{
  start: '1958-01-01',
  end: '1964-12-31',
  title: 'Brinkmanship Abroad, Struggle at Home',
  narrative: "The U.S. stares down nuclear war abroad—Sputnik orbits overhead, Kennedy defuses Cuba—but at home, America simmers. Black Americans march, sit-in, and fight for civil rights, while the country edges toward reckoning.",
  keywords: ['cuban missile crisis', 'kennedy', 'sputnik', 'bay of pigs', 'civil rights', 'freedom rides', 'cold war']
},

{
  start: '1965-01-01',
  end: '1975-04-30',
  title: 'Vietnam, Protest, and the Great Society',
  narrative: "In Vietnam, war rages. At home, cities burn after MLK's assassination. LBJ launches the Great Society—Medicare, education, civil rights—while anti-war protests erupt and distrust in government surges.",
  keywords: ['vietnam war', 'great society', 'civil rights', 'mlk', 'lbj', 'medicare', 'protests', 'cold war']
},

  {
    start: '1945-09-03',
    end: '2000-12-31',
    title: 'Post-War America',
    narrative: "You're in the golden age of suburbia, Cold War paranoia, and space race ambition. You might be dancing to Elvis, ducking under desks, or building dot-com dreams.",
    keywords: ['cold war', 'civil rights', 'moon landing', 'reagan', 'tech boom']
  },
  {
    start: '2001-01-01',
    end: '2020-03-11',
    title: 'Early 21st Century America',
    narrative: "You scroll through early smartphones, survive economic crashes, and watch the digital world reshape everything. Facebook is new. The world feels small, fast, and full of possibilities.",
    keywords: ['9/11', 'iraq war', 'obama', 'recession', 'technology']
  },
  {
    start: '2020-03-12',
    end: '2021-01-31',
    title: 'Pandemic America',
    narrative: "You’re locked down. Streets are empty, Zoom is your window to the world, and toilet paper is currency. The pandemic reshapes everyday life.",
    keywords: ['covid-19', '2020', 'pandemic', 'coronavirus']
  },
  {
    start: '2021-01-01',
    end: '2025-12-31',
    title: 'Post-Pandemic Reckoning',
    narrative: "You’re living through the long tail of a global crisis. The world is half-mask, half-memory. Remote work reshapes daily life, inflation bites, and geopolitical tension simmers from Ukraine to Gaza. AI explodes into public life. Everything feels accelerated—news cycles, tech, culture—yet somehow disorientingly unstable.",
    keywords: ['post-covid', 'ukraine', 'ai', 'inflation', '2020s']
  }
];

