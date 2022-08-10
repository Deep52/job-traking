// For more information see https://aka.ms/fsharp-console-apps

open System

let getdestination() : string =
        Console.Write("Enter destination: ")
        Console.ReadLine()

let petrol = 100

type location = 
    | Home | Office | Petrol | Gym | Super | Invalid

let convertString2Location (str : string) : location = 
    match str with 
        | "Home" -> location.Home
        | "Office" -> location.Office
        | "Gym" -> location.Gym
        | "Super" -> location.Super
        | "Petrol" -> location.Petrol
        | _ -> location.Invalid

let distanceBetweenLocations = 
    Map.ofList [
        (Home, Map.ofList[(Office, 16);(Petrol,9)]);
        (Office, Map.ofList[(Home,16);(Gym,10)]);
        (Petrol, Map.ofList[(Home,9);(Gym,20); (Super,22)]);
        (Gym, Map.ofList[(Petrol,20);(Office,10);(Super,7)]);
        (Super, Map.ofList[(Petrol,22); (Gym,7)])
    ]

let Dijkstra startLoc endLoc =
  let rec searchForShortestPath currentLoc distanceSoFar citiesVisitedSoFar accMap =
    let visitDestinations m =
      (m, distanceBetweenLocations.[currentLoc])
        ||> Map.fold
          (fun acc loc distance ->
             searchForShortestPath loc (distance + distanceSoFar) (citiesVisitedSoFar @ [loc]) acc)

    match Map.tryFind currentLoc accMap with
    | None -> accMap |> Map.add currentLoc (distanceSoFar, citiesVisitedSoFar) |> visitDestinations
    | Some x ->
        let (shortestKnownPath, _) = x
        if distanceSoFar < shortestKnownPath then
          accMap |> Map.add currentLoc (distanceSoFar, citiesVisitedSoFar) |> visitDestinations
        else accMap
  let shortestPaths = searchForShortestPath startLoc 0 [] Map.empty
  shortestPaths.[endLoc]

let rec Update startlocation ptrl =     
    let destinationString :string = getdestination() // Read from command prompt
    let destination :location = convertString2Location(destinationString)

    if destination = location.Invalid then
        Console.WriteLine("Invalid destination-try once more")
        Update startlocation ptrl
    else if destination = startlocation then
        Console.WriteLine("Destination is the same as current location!")
        Update startlocation ptrl
    else 
        //let petrol = 120
        let directLocations = distanceBetweenLocations[startlocation];
        if directLocations.ContainsKey(destination) then
            Console.WriteLine("Trying to drive to {0}", destination)
            let directDistance = directLocations[destination]

            if(directDistance > ptrl) then
                Console.WriteLine("Not enough petrol left! byee")   
                0
            else 
                let ptrl = ptrl - directDistance
                Console.WriteLine("You lost {0} petrol and have {1} left", directDistance, ptrl)
                if destination=location.Petrol then 
                    Console.WriteLine("You refilled to the maximum amount: {0} petrol", petrol)                    
                    Update destination petrol
                else 
                    Update destination ptrl
        else 
            let sp = Dijkstra startlocation destination
            Console.WriteLine("Shortest path is [{0}]", sp.Item2)
            if(sp.Item1 > ptrl) then
                Console.WriteLine("Not enough petrol left! byee")
                0
            else 
                let ptrl = ptrl - sp.Item1
                Console.WriteLine("You lost {0} petrol and have {1} left", sp.Item1, ptrl)
                Update destination ptrl
                
                
                

[<EntryPoint>]
let main argv =
    Console.WriteLine("You start at {1} with {0} petrol: ", petrol, location.Home)
    Update location.Home petrol
