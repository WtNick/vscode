/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Codicon } from 'vs/base/common/codicons';
import { ServicesAccessor } from 'vs/editor/browser/editorExtensions';
import { localize } from 'vs/nls';
import { Action2, MenuId, registerAction2 } from 'vs/platform/actions/common/actions';
import { INTERACTIVE_SESSION_CATEGORY } from 'vs/workbench/contrib/interactiveSession/browser/actions/interactiveSessionActions';
import { IInteractiveSessionWidget } from 'vs/workbench/contrib/interactiveSession/browser/interactiveSession';

export interface IInteractiveSessionExecuteActionContext {
	widget: IInteractiveSessionWidget;
}

function isExecuteActionContext(thing: unknown): thing is IInteractiveSessionExecuteActionContext {
	return typeof thing === 'object' && thing !== null && 'widget' in thing;
}

export function registerInteractiveSessionExecuteActions() {
	registerAction2(class SubmitAction extends Action2 {
		constructor() {
			super({
				id: 'workbench.action.interactiveSession.submit',
				title: {
					value: localize('interactive.submit.label', "Submit"),
					original: 'Submit'
				},
				f1: false,
				category: INTERACTIVE_SESSION_CATEGORY,
				icon: Codicon.send,
				menu: {
					id: MenuId.InteractiveSessionExecute,
					group: 'navigation',
				}
			});
		}

		run(accessor: ServicesAccessor, ...args: any[]) {
			const context = args[0];
			if (!isExecuteActionContext(context)) {
				return;
			}

			context.widget.acceptInput();
		}
	});

	registerAction2(class StopAction extends Action2 {
		constructor() {
			super({
				id: 'workbench.action.interactiveSession.stop',
				title: {
					value: localize('interactive.stop.label', "Stop"),
					original: 'Stop'
				},
				f1: false,
				category: INTERACTIVE_SESSION_CATEGORY,
				icon: Codicon.stop,
				// menu: {
				// 	id: MenuId.InteractiveSessionExecute,
				// 	group: 'navigation',
				// }
			});
		}

		run(accessor: ServicesAccessor, ...args: any[]) {
			const context = args[0];
			if (!isExecuteActionContext(context)) {
				return;
			}

			context.widget.acceptInput();
		}
	});
}
