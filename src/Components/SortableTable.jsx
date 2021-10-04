import React from "react";

const sortTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) => {
			//if (a.scorePercent) return a.scorePercent - b.scorePercent;
			//if (a.grade) return a.grade - b.grade;
			return a.dateFormat - b.dateFormat;
		}
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => {
			//if (a.scorePercent) return b.scorePercent - a.scorePercent;
			//if (a.grade) return b.grade - a.grade;
			return b.dateFormat - a.dateFormat;
		}
	},
	default: {
		class: 'sort',
		fn: (a, b) => b.dateFormat - a.dateFormat
	}
}

class SortableTable extends React.Component {
	state = {
		currentSort: 'default'
	}

	//changes sort value after sorting
	onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;
		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';
		this.setState({
			currentSort: nextSort
		})
	}

	render() {
		const { data } = this.props;
		const { currentSort } = this.state;
		//console.log(currentSort);

		return (data.length > 0 && (
			<div className="t">
				<table className="fl-table">
					<thead>
						<tr>
							<th>Candidate</th>
							<th>Exam</th>
							<th>Grade</th>
							<th>
								<a onClick={this.onSortChange} href="scr:"> 
								DateModified
									<i className={`fas fa-${sortTypes[currentSort].class}`}></i>
								</a>
							</th>

						</tr>
					</thead>

					<tbody>
						{[...data].sort(sortTypes[currentSort].fn).map(e => (

							<tr>
								<td>{`${e.firstname} ${e.lastname}`}</td>
								<td>{e.name}</td>
								<td>{e.scorePercent ? e.scorePercent : (e.grade).toFixed(2)}</td>
								<td>{e.dateFormat.getMonth() + "/" + e.dateFormat.getDate() + "/" + e.dateFormat.getFullYear()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		))
	}
}


export default SortableTable