import _ from "lodash";
import React from "react";
import { FcIdea } from "react-icons/fc";
import BadmintonField from "./components/BadmintonField";
import { TypeToggle } from "./components/ToggleButton";
import { useAppSelector } from "./redux/hook";

export type TeamType = {
  name: string;
  members: Array<string>;
  currServe: boolean;
  score: number;
  isAttacking: boolean;
};
export type MatchRecordType = {
  status: string;
  details: Array<TeamType>;
};

const initialState = {
  matchrecord: [{ status: "0 : 0", details: [] }],
  team: [
    {
      name: "1",
      members: ["PersonA", "PersonC"],
      currServe: true,
      score: 0,
      isAttacking: false,
    },
    {
      name: "2",
      members: ["PersonB", "PersonD"],
      currServe: false,
      score: 0,
      isAttacking: true,
    },
  ],
};

function App() {
  const appState = useAppSelector((state) => state.app);

  const [matchRecord, setMatchRecord] = React.useState<Array<MatchRecordType>>(initialState.matchrecord);

  const [team, setTeam] = React.useState<Array<TeamType>>(initialState.team);
  const [type, setType] = React.useState<"single" | "double">("single");

  const winsPoint = (teamidx: number) => {
    let _t = [...team];
    let _nt = [];
    for (let c = 0; c < _t.length; c++) {
      let extvalue = { ..._t[c] };
      let nxs = extvalue.currServe;
      if (c === teamidx) {
        //team winning
        nxs = extvalue.isAttacking ? extvalue.currServe : !extvalue.currServe;
        _nt.push({ ...extvalue, currServe: nxs, score: extvalue.score + 1, isAttacking: true });
      } else {
        //team losing
        _nt.push({ ...extvalue, currServe: nxs, isAttacking: false });
      }
    }
    setTeam(_nt);

    //summary
    let status = _nt.map((t) => t.score).join(" : ");
    let matRec = [...matchRecord];
    matRec.push({ status, details: _nt });

    let winner = validateWinningScore(_nt);
    if (winner !== null) {
      matRec.push({ status: "Game End. Team " + winner.name + " wins.", details: [] });
    }
    setMatchRecord(matRec);
  };

  const swapView = () => {
    let _t = [...team];
    setTeam([_t[1], _t[0]]);
  };

  const restartGame = () => {
    setMatchRecord(initialState.matchrecord);
    setTeam(initialState.team);
  };

  const onPlayerClicked = (teamidx: number, membername: string) => {
    let newname = prompt("Please enter your new name:", "You"); //membername);

    //check if duplicate
    if (newname && newname !== membername) {
      let foundName = 0;
      for (var t of team) {
        for (var m of t.members) {
          if (m === newname) {
            foundName++;
          }
        }
      }
      if (foundName > 0) {
        alert("Duplicate names.");
      } else {
        let newteam = [...team];
        let newmember = [...newteam[teamidx].members];
        let newmemberidx = _.findIndex(newmember, (o) => o === membername);
        newmember[newmemberidx] = newname;
        newteam[teamidx] = { ...newteam[teamidx], members: newmember };
        setTeam(newteam);
      }
    }
  };

  const validateWinningScore = (_t: Array<TeamType>): TeamType | null => {
    //check if 21
    if (_t[0].score >= 21 && _t[1].score < 20) return _t[0];
    if (_t[1].score >= 21 && _t[0].score < 20) return _t[1];

    if (
      //check if anyone more than 21
      (_t[0].score >= 21 || _t[1].score >= 21) &&
      //check if anyone winning opponent for more than 1 point
      (Math.abs(_t[0].score - _t[1].score) > 1 ||
        //check if anyone's score less than 20
        _t[1].score < 20 ||
        _t[0].score < 20 ||
        //check if anyone reached 30
        _t[1].score >= 30 ||
        _t[0].score >= 30)
    ) {
      return _t[0].score > _t[1].score ? _t[0] : _t[1];
    }

    return null;
  };

  return (
    <div className="App">
      <div className="flex-center-between flex-wrap p-2" style={{ background: "darkblue", color: "white" }}>
        <div className="flex-center">
          <FcIdea size={25} />
          <span className="header">SMART IDEAS</span>
        </div>
        <div>{"Badminton Match " + appState.version.toFixed(1)}</div>
      </div>
      <div className="flex-center-center">
        <TypeToggle toggled={type === "double"} onClick={(e) => setType(e ? "double" : "single")} />
        <BadmintonField type={type} teams={team} onScorePoint={winsPoint} records={matchRecord} swap={swapView} restart={restartGame} onPlayerClicked={onPlayerClicked} />
      </div>
    </div>
  );
}

export default App;
