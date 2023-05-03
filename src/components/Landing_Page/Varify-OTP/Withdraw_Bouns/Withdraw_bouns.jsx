import React from 'react'

export default function Withdraw_bouns() {
    return (
        <div>

            <div class="card radius-10 overflow-hidden">
                <div class="card-body">
                    <p>Withdrawal Share Bonus</p>

                    <div class="Prg_container">
                        <div class="barcontainer">
                            <div class="bar" style={{ height: "25%" }}>
                                <p style={{ textAlign: "center" }}>500</p>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="progress_bar" style={{width:'100%'}}></div>
            </div>
        </div>
    )
}
