import Filters from "../components/pet-search/filters/Filters";
import PetsGrid from "../components/pet-search/pets/PetsGrid";
import { QueryParams } from "../types/types";

export default async function PetSearch({
  searchParams,
}: {
  searchParams: QueryParams;
}) {
  /*   db.insertMany([
    {
      name: "Bolillo",
      imageUrl:
        "https://i.natgeofe.com/n/2cf64015-d343-4981-90cd-c528a65812e0/01-stray-dogs-nationalgeographic_1927666_16x9.jpg",
      description:
        "Bolillo is a friendly and energetic dog who loves to run and play. He enjoys being around people, always wagging his tail when someone comes near. His outgoing personality makes him a perfect companion for families with kids or active individuals who enjoy outdoor adventures. Bolillo has a special way of bonding with people and would love nothing more than to find a forever home where he can spread joy and companionship.",
      birthdate: new Date("2022-02-09"),
      ownerId: "ivan",
      species: "dog",
      sex: "male",
      size: "medium",
      createdAt: new Date(),
      updatedAt: new Date(),
      location: {
        type: "Point",
        coordinates: [-100.417838, 20.65191],
      },
    },
    {
      name: "Chispa",
      imageUrl:
        "https://media.4-paws.org/2/5/7/b/257b71188574666420e1f3d988648bc6a4caaced/VIER%20PFOTEN_2018-05-02_623-1927x1333-1920x1328.jpg",
      description:
        "Chispa is a lovable dog who lives up to his name, which means 'spark.' He is full of life, always up for a good game of fetch or a long walk. Despite his playful side, Chispa also enjoys curling up for a nap by your feet after a busy day. He's looking for a home that can give him the attention and love he craves. Chispa has a calm temperament and would fit well in a home where he can bond deeply with his new family.",
      birthdate: new Date("2022-12-07"),
      ownerId: "laura",
      species: "dog",
      sex: "male",
      size: "medium",
      createdAt: new Date(1705286400000),
      updatedAt: new Date(1705372800000),
      location: {
        type: "Point",
        coordinates: [-100.141097, 20.638457],
      },
    },
    {
      name: "Luna",
      imageUrl:
        "https://s30379.pcdn.co/wp-content/uploads/2019/09/p1cuv198jk1t3oief1vesoae1rnq6.jpg",
      description:
        "Luna, a curious and independent cat, has a gentle spirit but isn't shy about exploring her surroundings. She loves lounging by the window, watching the world go by. Luna's soft, calming presence makes her a wonderful companion for anyone seeking a loyal and peaceful friend. Though independent, she enjoys moments of affection and purrs happily when she's near those she trusts.",
      birthdate: new Date("2021-02-04"),
      ownerId: "carlos",
      species: "cat",
      sex: "female",
      size: "medium",
      createdAt: new Date(1706784000000),
      updatedAt: new Date(1707062400000),
      location: {
        type: "Point",
        coordinates: [-97.909102, 22.21794],
      },
    },
    {
      name: "Pelusa",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      description:
        "Pelusa is an affectionate cat who loves cuddling and being around people. She is calm, easygoing, and enjoys spending her days basking in the sun or curling up on a comfy blanket. Pelusa's affectionate nature means she will always greet you with a soft meow, making her perfect for a loving household. She's the type of cat who enjoys being part of the family, participating in the quiet moments of life.",
      birthdate: new Date("2022-03-02"),
      ownerId: "ivan",
      species: "cat",
      sex: "female",
      size: "small",
      createdAt: new Date(1709452800000),
      updatedAt: new Date(1710336000000),
      location: {
        type: "Point",
        coordinates: [-100.214677, 20.71866],
      },
    },
    {
      name: "Sol",
      imageUrl:
        "https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg",
      description:
        "Sol is a bright and energetic cat who loves playing and chasing toys around the house. She has a playful and mischievous side but also knows how to relax when it's time to wind down. Sol is always up for a good adventure and enjoys spending time climbing or playing with toys. She would thrive in a home that appreciates her lively spirit and can provide her with plenty of mental stimulation.",
      birthdate: new Date("2019-09-29"),
      ownerId: "carlos",
      species: "cat",
      sex: "female",
      size: "medium",
      createdAt: new Date(1712131200000),
      updatedAt: new Date(1713254400000),
      location: {
        type: "Point",
        coordinates: [-97.875515, 22.273225],
      },
    },
    {
      name: "Milo",
      imageUrl:
        "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg",
      description:
        "Milo is a gentle and sweet-natured cat who loves a good lap to curl up on. He enjoys calm, peaceful environments where he can rest and observe the world around him. Milo's soft purr and affectionate nudges make him the perfect companion for someone looking for a quiet, loving friend. He's ready to bring warmth and love to a home that can provide him with the care and companionship he needs.",
      birthdate: new Date("2017-12-12"),
      ownerId: "carlos",
      species: "cat",
      sex: "male",
      size: "small",
      createdAt: new Date(1714819200000),
      updatedAt: new Date(1715424000000),
      location: {
        type: "Point",
        coordinates: [-100.356631, 20.520133],
      },
    },
    {
      name: "Rex",
      imageUrl:
        "https://www.pasadenastarnews.com/wp-content/uploads/2019/11/A485061_Houston-1.jpg",
      description:
        "Rex is a fun-loving dog who has an infectious joy for life. He loves being active and thrives when he's outdoors, exploring new places. Whether it's running through a park or taking long walks, Rex will be right by your side. His friendly nature makes him a great companion for families or individuals who enjoy outdoor activities. Rex is searching for a home where he can continue to explore and share his boundless energy.",
      birthdate: new Date("2019-08-27"),
      ownerId: "carlos",
      species: "dog",
      sex: "male",
      size: "small",
      createdAt: new Date(1717411200000),
      updatedAt: new Date(1717824000000),
      location: {
        type: "Point",
        coordinates: [-100.40496, 20.557317],
      },
    },
    {
      name: "Nina",
      imageUrl:
        "https://img.freepik.com/free-photo/close-up-portrait-beautiful-cat_23-2149214411.jpg",
      description:
        "Nina is a gentle cat who enjoys spending her days lounging in the sun and quietly watching the world. She has a calm and laid-back personality, making her the perfect companion for those who want a peaceful presence at home. Nina can be independent but loves affection when it's offered, and she will purr contentedly when you pet her. She's looking for a tranquil home where she can be loved and appreciated.",
      birthdate: new Date("2022-11-03"),
      ownerId: "sofia",
      species: "cat",
      sex: "female",
      size: "medium",
      createdAt: new Date(1720099200000),
      updatedAt: new Date(1721184000000),
      location: {
        type: "Point",
        coordinates: [-99.925782, 16.876376],
      },
    },
    {
      name: "Toby",
      imageUrl:
        "https://www.derby.gov.uk/news/media/derbycitycouncil/content/images/news/animals/stray-dog-881x585.jpg",
      description:
        "Toby is a loving dog with a kind heart and a playful attitude. He loves to meet new people and will greet anyone with a wagging tail and happy barks. Toby enjoys spending time outdoors, running around in open spaces, but he also knows when to relax and enjoy some downtime. He's looking for a home that values his playful and affectionate personality and will give him the love and attention he deserves.",
      birthdate: new Date("2018-06-03"),
      ownerId: "ivan",
      species: "dog",
      sex: "male",
      size: "medium",
      createdAt: new Date(1722675200000),
      updatedAt: new Date(1723651200000),
      location: {
        type: "Point",
        coordinates: [-100.153461, 20.709292],
      },
    },
    {
      name: "Simba",
      imageUrl:
        "https://bestfriends.org/sites/default/files/styles/large_mobile/public/2022-04/DE_Egypt5843MW_0.jpg",
      description:
        "Simba is a curious and adventurous cat who loves exploring his surroundings. He is always looking for new places to investigate and enjoys playing with toys that keep his mind stimulated. Simba's independent nature doesn't stop him from seeking affection from his favorite people, and he will happily curl up for cuddles at the end of the day. He's ready for a home that appreciates his inquisitive spirit.",
      birthdate: new Date("2020-09-03"),
      ownerId: "laura",
      species: "cat",
      sex: "male",
      size: "small",
      createdAt: new Date(1725267200000),
      updatedAt: new Date(1725868800000),
      location: {
        type: "Point",
        coordinates: [-97.865555, 22.298105],
      },
    },
    {
      name: "Bella",
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/yzV5i2F35i9RozwSeFLPJV-1200-80.jpg",
      description:
        " Bella is a sweet and loving cat with a calm personality. She enjoys the quiet life, often finding cozy spots to curl up and nap. Bella's gentle nature makes her a perfect companion for someone looking for a peaceful and affectionate pet. She doesn't need much to be happy—just a warm place to sleep and someone to share her quiet moments with. Bella is ready to bring calm and love to her new home.",
      birthdate: new Date("2018-05-16"),
      ownerId: "sofia",
      species: "cat",
      sex: "female",
      size: "small",
      createdAt: new Date(1706860800000),
      updatedAt: new Date(1706947200000),
      location: {
        type: "Point",
        coordinates: [-99.800424, 16.950981],
      },
    },
    {
      name: "Rocky",
      imageUrl:
        "https://jaldeevets.com/wp-content/uploads/2023/02/Jaldee-Vets-Blog-Banners-42.png",
      description:
        "Rocky is an energetic dog who loves to be active and on the go. He enjoys long walks, playing fetch, and spending time outdoors. His boundless enthusiasm is contagious, and he'll keep you on your toes with his playful antics. Rocky is looking for an owner who shares his love for adventure and can provide him with plenty of activities to keep him happy. He's eager to find a home where he can share his joyful personality.",
      birthdate: new Date("2024-06-28"),
      ownerId: "laura",
      species: "dog",
      sex: "male",
      size: "small",
      createdAt: new Date(1709500800000),
      updatedAt: new Date(1709587200000),
      location: {
        type: "Point",
        coordinates: [-97.843279, 22.239811],
      },
    },
    {
      name: "Maya",
      imageUrl:
        "https://i0.wp.com/rescuedoghome.com/wp-content/uploads/2023/12/DSC_0120-RDH.jpg",
      description:
        "Maya is a loving dog with a protective side. She's incredibly loyal to her humans and enjoys spending time by their side. Maya loves long walks and is always up for a good game of fetch, but she's also content to relax at home and enjoy some quiet time. Her affectionate nature makes her a wonderful companion for a family or individual looking for a loyal and loving pet.",
      birthdate: new Date("2020-12-17"),
      ownerId: "maria",
      species: "dog",
      sex: "female",
      size: "x-large",
      createdAt: new Date(1712227200000),
      updatedAt: new Date(1712313600000),
      location: {
        type: "Point",
        coordinates: [-97.84446, 22.342445],
      },
    },
    {
      name: "Buddy",
      imageUrl: "https://toegrips.com/wp-content/uploads/stray-puppy-jake-.jpg",
      description:
        "Buddy is a dog who lives up to his name—he's always ready to be your best friend. He loves spending time with people and has an easygoing, friendly personality. Whether it's a walk in the park or a cozy night at home, Buddy will be right there by your side, offering love and companionship. He's looking for a home where he can be part of the family and bring joy to everyone around him.",
      birthdate: new Date("2022-08-16"),
      ownerId: "maria",
      species: "dog",
      sex: "male",
      size: "small",
      createdAt: new Date(1714944000000),
      updatedAt: new Date(1715030400000),
      location: {
        type: "Point",
        coordinates: [-100.438054, 20.607224],
      },
    },
    {
      name: "Charlie",
      imageUrl:
        "https://media.petinsurancereview.com/2023/06/pexels-karina-badura-6982643.jpg",
      description:
        "Charlie is a curious and intelligent cat who loves exploring his surroundings. He enjoys interactive toys and challenges that stimulate his mind. Charlie also has a soft side, enjoying cuddles and affection from those he trusts. He's looking for a home where he can balance his need for adventure with his love of quiet, peaceful moments.",
      birthdate: new Date("2020-03-25"),
      ownerId: "carlos",
      species: "cat",
      sex: "male",
      size: "small",
      createdAt: new Date(1717632000000),
      updatedAt: new Date(1717718400000),
      location: {
        type: "Point",
        coordinates: [-99.866887, 16.981672],
      },
    },
    {
      name: "Max",
      imageUrl:
        "https://wallpapers.com/images/hd/black-cat-with-green-eyes-b69o20tv3r6v1rc5.jpg",
      description:
        "Max is a calm and affectionate cat who enjoys spending time with his humans. He's the perfect lap cat, always ready for a cuddle or a nap by your side. Max also enjoys his independence and likes having quiet spaces to relax and observe. He's looking for a home where he can enjoy both affection and peaceful solitude, bringing warmth and love to those around him.",
      birthdate: new Date("2018-04-15"),
      ownerId: "carlos",
      species: "cat",
      sex: "male",
      size: "large",
      createdAt: new Date(1720310400000),
      updatedAt: new Date(1720396800000),
      location: {
        type: "Point",
        coordinates: [-100.389559, 20.642133],
      },
    },
    {
      name: "Daisy",
      imageUrl: "https://news.orvis.com/wp-content/uploads/2019/08/stray.jpg",
      description:
        "Daisy is an energetic dog who loves being outdoors. She thrives on physical activity and enjoys going for long walks, hikes, or even a run in the park. Daisy's playful spirit makes her an excellent companion for an active household. While she loves to play, she also enjoys relaxing at home, making her a well-rounded companion.",
      birthdate: new Date("2019-03-10"),
      ownerId: "sofia",
      species: "dog",
      sex: "female",
      size: "x-large",
      createdAt: new Date(1722912000000),
      updatedAt: new Date(1722998400000),
      location: {
        type: "Point",
        coordinates: [-97.909209, 22.231936],
      },
    },
    {
      name: "Coco",
      imageUrl:
        "https://www.marthastewart.com/thmb/f9ofIVfCauU6y-z-0fJFCLWtSn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/persian-cat-getty-0220-2000-d95a324913e34c13812c85f117e471a9.jpg",
      description:
        "Coco is a sweet and affectionate cat who loves attention from her humans. She enjoys being petted and will often seek out her favorite people for cuddles. Coco has a gentle and easygoing nature, making her a perfect companion for anyone looking for a loving and loyal friend. She's ready to find a home where she can share her affection and become a cherished family member.",
      birthdate: new Date("2017-05-26"),
      ownerId: "laura",
      species: "cat",
      sex: "female",
      size: "medium",
      createdAt: new Date(1725638400000),
      updatedAt: new Date(1725724800000),
      location: {
        type: "Point",
        coordinates: [-99.901457, 16.847171],
      },
    },
    {
      name: "Zeus",
      imageUrl:
        "https://img.freepik.com/premium-photo/chihuahua-puppies-sit-brick-block-view-from_35239-32.jpg",
      description:
        "Zeus is a strong and energetic dog who loves to play and run. He's always ready for a good game of fetch or a long walk in the park. Zeus is loyal and protective, making him a great companion for someone who enjoys outdoor activities. He's looking for a home where he can be active and have plenty of space to explore and play.",
      birthdate: new Date("2021-08-22"),
      ownerId: "laura",
      species: "dog",
      sex: "male",
      size: "small",
      createdAt: new Date(1706860800000),
      updatedAt: new Date(1706947200000),
      location: {
        type: "Point",
        coordinates: [-97.898229, 22.195345],
      },
    },
    {
      name: "Bobby",
      imageUrl:
        "https://i2-prod.nottinghampost.com/news/uk-world-news/article8756567.ece/ALTERNATES/s615/0_GettyImages-1363846870.jpg",
      description:
        "Bobby is a playful and energetic dog who loves being around people. He enjoys running and playing fetch and has a natural curiosity about the world around him. Bobby's enthusiastic personality makes him a perfect companion for someone who enjoys outdoor activities and has the time to engage with him. He's ready for a home where he can share his energy and bring happiness to his new family.",
      birthdate: new Date("2022-04-14"),
      ownerId: "maria",
      species: "dog",
      sex: "male",
      size: "x-large",
      createdAt: new Date(1709500800000),
      updatedAt: new Date(1709587200000),
      location: {
        type: "Point",
        coordinates: [-99.77479, 16.919891],
      },
    },
    {
      name: "Lola",
      imageUrl:
        "https://cdn.britannica.com/93/181393-050-9FC2E61A/cat-Alison-Eldridge-orange-Calico.jpg",
      description:
        "Lola is an adventurous and independent cat who enjoys exploring her surroundings. She has a playful side and can often be found chasing after toys or investigating new areas. Despite her independent streak, she also loves affection and will curl up in your lap for some quiet time. Lola is looking for a home where she can enjoy both her freedom and cuddles with her favorite humans.",
      birthdate: new Date("2021-05-18"),
      ownerId: "maria",
      species: "cat",
      sex: "female",
      size: "large",
      createdAt: new Date(1706928000000),
      updatedAt: new Date(1707014400000),
      location: {
        type: "Point",
        coordinates: [-99.922876, 16.984757],
      },
    },
    {
      name: "Mimi",
      imageUrl:
        "https://www.onegreenplanet.org/wp-content/uploads/2014/06/puppay.jpg",
      description:
        "Mimi is a lively and energetic dog who thrives on outdoor activities. She loves running, playing fetch, and going for long walks. Her boundless energy makes her a great companion for an active household or individual who enjoys spending time outdoors. Mimi is ready to find a family that will join her on adventures and provide her with plenty of love and playtime",
      birthdate: new Date("2024-04-06"),
      ownerId: "carlos",
      species: "dog",
      sex: "female",
      size: "medium",
      createdAt: new Date(1709587200000),
      updatedAt: new Date(1709673600000),
      location: {
        type: "Point",
        coordinates: [-97.892793, 22.297084],
      },
    },
    {
      name: "Firulais",
      imageUrl:
        "https://i.natgeofe.com/n/a8ea290b-d05b-4176-9c09-29095c85612f/34764.jpg",
      description:
        "Firulais is a calm and affectionate dog who loves lounging around the house. He enjoys finding cozy spots to relax and will occasionally seek out attention from his favorite humans for some pets and scratches. Firulais is looking for a peaceful home where he can enjoy his quiet time while still receiving affection and care from his family.",
      birthdate: new Date("2019-01-09"),
      ownerId: "maria",
      species: "dog",
      sex: "male",
      size: "large",
      createdAt: new Date(1712313600000),
      updatedAt: new Date(1712400000000),
      location: {
        type: "Point",
        coordinates: [-97.924191, 22.214452],
      },
    },
    {
      name: "Tito",
      imageUrl: "https://www.loveyourchihuahua.com/images/ChibpillowLR.jpg",
      description:
        "Tito is a small but mighty dog with a big personality. He loves being the center of attention and enjoys playtime as much as he enjoys cuddling on the couch. Tito is loyal and loves being around people, making him the perfect companion for anyone looking for a little dog with a lot of love to give. He's eager to find a home where he can be a cherished member of the family.",
      birthdate: new Date("2016-09-10"),
      ownerId: "ivan",
      species: "dog",
      sex: "male",
      size: "small",
      createdAt: new Date(1715030400000),
      updatedAt: new Date(1715116800000),
      location: {
        type: "Point",
        coordinates: [-100.211808, 20.656889],
      },
    },
    {
      name: "Bruno",
      imageUrl:
        "https://www.marthastewart.com/thmb/eXW2-w5aE5F3Wdwg_RuVEW7_lsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/british-longhair-cat-getty-0121-2000-614084e5f25b4eef888306cd26df0197.jpg",
      description:
        "Bruno is a laid-back and gentle cat with a calm demeanor. He enjoys the quiet life, often lounging in sunny spots or curling up in a cozy bed. Bruno is affectionate in his own way, preferring gentle pets and spending time near his humans without being too demanding. He's looking for a peaceful home where he can relax and enjoy his days in comfort.",
      birthdate: new Date("2017-01-31"),
      ownerId: "ivan",
      species: "cat",
      sex: "male",
      size: "medium",
      createdAt: new Date(1717718400000),
      updatedAt: new Date(1717804800000),
      location: {
        type: "Point",
        coordinates: [-97.919811, 22.21477],
      },
    },
    {
      name: "Fiona",
      imageUrl:
        "https://www.comfortzone.com/-/media/Project/OneWeb/ComfortZone/Images/Blog/bringing-new-kitten-home.jpg",
      description:
        "Fiona is a playful and curious young cat who loves exploring her environment. She's full of energy and can often be found chasing after toys or climbing to new heights. Fiona is also affectionate and enjoys the company of her humans, making her a great fit for a home where she can balance playtime with cuddles. She's ready to bring joy and excitement to her new family.",
      birthdate: new Date("2024-05-19"),
      ownerId: "ivan",
      species: "cat",
      sex: "female",
      size: "small",
      createdAt: new Date(1720396800000),
      updatedAt: new Date(1720483200000),
      location: {
        type: "Point",
        coordinates: [-97.928519, 22.262254],
      },
    },
    {
      name: "Rita",
      imageUrl:
        "https://i.pinimg.com/222x/f3/32/2d/f3322d8916f5ac596b2ab8c02bdb077e.jpg",
      description:
        "Rita is a small but confident cat with a bold personality. She loves to explore and is always on the lookout for new adventures. Despite her strong-willed nature, Rita is also affectionate and enjoys attention from her favorite humans. She's looking for a home where she can express her independence while still receiving love and care.",
      birthdate: new Date("2024-02-18"),
      ownerId: "carlos",
      species: "cat",
      sex: "female",
      size: "small",
      createdAt: new Date(1722998400000),
      updatedAt: new Date(1723084800000),
      location: {
        type: "Point",
        coordinates: [-100.214664, 20.491507],
      },
    },
    {
      name: "Nala",
      imageUrl:
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/newscms/2015_32/711771/pets-senior-dogs-today-150803-06.jpg",
      description:
        "Nala is a gentle and loyal dog who enjoys the company of her family. She's calm and well-behaved, making her a perfect companion for both indoor relaxation and outdoor activities like walks in the park. Nala is affectionate and loves to be around people, always ready to offer her loyalty and companionship. She's looking for a home where she can be part of a loving family.",
      birthdate: new Date("2016-04-22"),
      ownerId: "laura",
      species: "dog",
      sex: "female",
      size: "medium",
      createdAt: new Date(1725724800000),
      updatedAt: new Date(1725811200000),
      location: {
        type: "Point",
        coordinates: [-100.111243, 20.531619],
      },
    },
    {
      name: "Gizmo",
      imageUrl:
        "https://i.pinimg.com/550x/b0/47/44/b047447508e695f8c32da133afaddcd5.jpg",
      description:
        "Gizmo is a curious and energetic cat who loves to explore and play. He has a mischievous side, often finding new toys or objects to investigate, but he also has a sweet and affectionate personality. Gizmo enjoys both independent playtime and moments of affection with his humans, making him a well-rounded companion for any home.",
      birthdate: new Date("2019-02-04"),
      ownerId: "ivan",
      species: "cat",
      sex: "male",
      size: "small",
      createdAt: new Date(1706928000000),
      updatedAt: new Date(1707014400000),
      location: {
        type: "Point",
        coordinates: [-99.814134, 16.851381],
      },
    },
    {
      name: "Rocco",
      imageUrl: "https://scitechdaily.com/images/Stray-Dog.jpg",
      description:
        "Rocco is a playful and friendly dog who loves being active. He enjoys running around, playing fetch, and going on adventures. His outgoing personality makes him a great companion for an active household that enjoys spending time outdoors. Rocco is looking for a home where he can share his energy and enthusiasm while forming strong bonds with his new family.",
      birthdate: new Date("2022-08-10"),
      ownerId: "laura",
      species: "dog",
      sex: "male",
      size: "medium",
      createdAt: new Date(1709587200000),
      updatedAt: new Date(1709673600000),
      location: {
        type: "Point",
        coordinates: [-100.417838, 20.65191],
      },
    },
  ]);  */

  return (
    <main className="m-auto flex w-full max-w-[1200px] flex-col gap-4 bg-gray-100 p-2 md:flex-row md:p-8">
      <Filters />
      <div className="flex w-full flex-col gap-4 md:w-3/4">
        <PetsGrid params={searchParams} />
      </div>
    </main>
  );
}
