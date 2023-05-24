import _ from "lodash";
import { AiOutlineSwap } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";
import styled from "styled-components";
import { MatchRecordType, TeamType } from "../App";
import bmintonimg from "../assets/badminton-court.png";
import characterimg from "../assets/character.png";

const BadmintonBg = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1;
  > div {
    background-color: #278953;
    position: relative;
  }
  > div:first-child {
    > img {
      width: 390px;
      height: 637px;
    }
    > .opp-main-fd {
      position: absolute;
      /* background: green; */
      top: 39px;
      left: 35px;
      width: 320px;
      height: 210px;
      > .opp-serve-fd {
        position: absolute;
        /* background: lightgreen; */
        top: 39px;
        left: 20px;
        padding: 0 25px;
        width: 277px;
        height: 178px;
        > div {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          > div {
            z-index: 2;
          }
          > img {
            z-index: 2;
            transform: rotate(180deg);
            border: 3px solid black;
            border-radius: 50%;
            padding: 10px;
            width: 80px;
            height: 80px;
          }
        }
        > div.attacker.left {
          margin-top: 130px;
          margin-right: 30px;
        }
        > div.left {
          margin-bottom: 60px;
        }
        > div.attacker.right {
          margin-top: 130px;
          margin-left: 30px;
        }
        > div.right {
          margin-bottom: 60px;
        }
      }
    }

    > .att-main-fd {
      position: absolute;
      /* background: red; */
      top: 380px;
      left: 35px;
      width: 320px;
      height: 215px;
      > .att-serve-fd {
        position: absolute;
        /* background: pink; */
        top: 0;
        left: 20px;
        padding: 0 25px;
        width: 277px;
        height: 177px;
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          > div {
            z-index: 2;
          }
          > img {
            z-index: 2;
            border: 3px solid black;
            border-radius: 50%;
            padding: 10px;
            width: 80px;
            height: 80px;
          }
        }
        > div.attacker.left {
          margin-bottom: 130px;
          margin-left: 30px;
        }
        > div.left {
          margin-top: 60px;
        }
        > div.attacker.right {
          margin-bottom: 130px;
          margin-right: 30px;
        }
        > div.right {
          margin-top: 60px;
        }
      }
    }
  }
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
  }
`;

const ServiceAreaHint = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
  bottom: 0;
  left: -25px;
  width: 164px;
  z-index: 1;
  &.right {
    left: 140px;
  }

  animation: blinker 1.2s linear infinite;
  @keyframes blinker {
    50% {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 262px;
  left: 50px;
  width: 285px;
  height: 113px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid darkblue;
    width: 120px;
    height: 50px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    :hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const SwapButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 295px;
  left: 60px;
  background: white;
  padding: 8px;
`;

const RestartButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 295px;
  left: 280px;
  background: white;
  padding: 8px;
`;

function PlayerColoring(areaPos: "l" | "r", teamAttacking: boolean, teamNextServePos: "l" | "r", OppNextServePos: "l" | "r") {
  if (teamAttacking) {
    // Player attacking serve pos
    if (teamNextServePos === areaPos) return "red";
  } else {
    // Player defending serve pos
    if (OppNextServePos === areaPos) return "green";
    // Player defending next serve pos
    // if (teamNextServePos === areaPos) return "blue";
  }
  return "transparent";
}

type BadmintonFieldType = {
  teams: Array<TeamType>;
  type: "double" | "single";
  records: Array<MatchRecordType>;
  onScorePoint: (teamidx: number) => void;
  swap: () => void;
  restart: () => void;
  onPlayerClicked: (teamidx: number, membername: string) => void;
};

function BadmintonField({ teams, type, records, swap, restart, onScorePoint, onPlayerClicked }: BadmintonFieldType) {
  let attacker = _.find(teams, (o) => o.isAttacking);
  if (attacker) {
    let defenderSerPos: "l" | "r" = attacker.score % 2 === 0 ? "r" : "l";
    return (
      <BadmintonBg>
        <div>
          <img alt={"badminton-court"} src={bmintonimg} />
          <ScoreBoard>
            {teams.map((item, index) => {
              return (
                <div key={"score-" + index} onClick={() => onScorePoint(index)}>
                  {item.score}
                </div>
              );
            })}
          </ScoreBoard>
          <SwapButton onClick={swap}>
            <AiOutlineSwap size={30} />
          </SwapButton>
          <RestartButton onClick={restart}>
            <MdRestartAlt size={30} />
          </RestartButton>
          {teams.map((t, ti) => {
            let ser_mm = type === "single" ? t.members[0] : t.members[t.currServe ? 0 : 1];
            let standy_mm = type === "single" ? t.members[0] : t.members[t.currServe ? 1 : 0];

            let serPos: "l" | "r" = t.score % 2 === 0 ? "r" : "l";
            let left_mm = serPos === "l" ? ser_mm : standy_mm;
            let right_mm = serPos === "r" ? ser_mm : standy_mm;

            let field = ti === 0 ? "opp" : "att";

            return (
              <div key={"team-" + ti} className={field + "-main-fd flex-center-between"}>
                <div className={field + "-serve-fd flex-center-between"} style={{ flexDirection: ti === 0 ? "row-reverse" : "row", flex: 1 }}>
                  <div className={t.isAttacking ? (serPos === "l" ? "attacker" : "") + " left" : ""}>
                    {((t.isAttacking && serPos === "l") || (!t.isAttacking && defenderSerPos === "l") || type === "double") && (
                      <>
                        {!t.isAttacking && defenderSerPos === "l" && <ServiceAreaHint className={ti === 0 ? "right" : ""} />}
                        <div style={{ cursor: "pointer" }} onClick={() => onPlayerClicked(ti, left_mm)}>
                          {left_mm}
                        </div>
                        <img alt={field + "left-player"} src={characterimg} style={{ borderColor: PlayerColoring("l", t.isAttacking, serPos, defenderSerPos) }} />
                      </>
                    )}
                  </div>

                  <div className={t.isAttacking ? (serPos === "r" ? "attacker" : "") + " right" : ""}>
                    {((t.isAttacking && serPos === "r") || (!t.isAttacking && defenderSerPos === "r") || type === "double") && (
                      <>
                        {!t.isAttacking && defenderSerPos === "r" && <ServiceAreaHint className={ti === 0 ? "" : "right"} />}
                        <div style={{ cursor: "pointer" }} onClick={() => onPlayerClicked(ti, right_mm)}>
                          {right_mm}
                        </div>
                        <img alt={field + "right-player"} src={characterimg} style={{ borderColor: PlayerColoring("r", t.isAttacking, serPos, defenderSerPos) }} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/*<div>
           records.map((mr, mri) => {
            return <div key={"mr-" + mri}>{mr.status}</div>;
          }) 
        </div>*/}
      </BadmintonBg>
    );
  } else {
    return null;
  }
}

export default BadmintonField;
