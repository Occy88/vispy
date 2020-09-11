import numpy as np
import pandas as pd
from IPython.display import clear_output
import matplotlib.pyplot as plt
import seaborn as sns

sns_colors = sns.color_palette('colorblind')
# Load dataset.
dftrain = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/train.csv')
dfeval = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/eval.csv')
y_train = dftrain.pop('survived')
dfeval2=dfeval.copy()
y_eval = dfeval.pop('survived')

import tensorflow as tf

print(dftrain.keys().tolist())
tf.random.set_seed(123)
fc = tf.feature_column
CATEGORICAL_COLUMNS = ['sex', 'n_siblings_spouses', 'parch', 'class', 'deck',
                       'embark_town', 'alone']
NUMERIC_COLUMNS = ['age', 'fare']


def one_hot_cat_column(feature_name, vocab):
    return fc.indicator_column(
        fc.categorical_column_with_vocabulary_list(feature_name,
                                                   vocab))


feature_columns = []
for feature_name in CATEGORICAL_COLUMNS:
    # Need to one-hot encode categorical features.
    vocabulary = dftrain[feature_name].unique()
    print(vocabulary)
    feature_columns.append(one_hot_cat_column(feature_name, vocabulary))
    print("==============")
    print(one_hot_cat_column(feature_name, vocabulary))

for feature_name in NUMERIC_COLUMNS:
    feature_columns.append(fc.numeric_column(feature_name,
                                             dtype=tf.float32))
    # Use entire batch since this is such a small dataset.
    NUM_EXAMPLES = len(y_train)


def make_input_fn(X, y, n_epochs=None, shuffle=True):
    def input_fn():
        dataset = tf.data.Dataset.from_tensor_slices((X.to_dict(orient='list'), y))
        if shuffle:
            dataset = dataset.shuffle(NUM_EXAMPLES)
        # For training, cycle thru dataset as many times as need (n_epochs=None).
        dataset = (dataset
                   .repeat(n_epochs)
                   .batch(NUM_EXAMPLES))
        return dataset

    return input_fn


# Training and evaluation input functions.
train_input_fn = make_input_fn(dftrain, y_train)
eval_input_fn = make_input_fn(dfeval, y_eval, shuffle=False, n_epochs=1)
params = {
    'n_trees': 50,
    'max_depth': 3,
    'n_batches_per_layer': 1,
    # You must enable center_bias = True to get DFCs. This will force the model to
    # make an initial prediction before using any features (e.g. use the mean of
    # the training labels for regression or log odds for classification when
    # using cross entropy loss).
    'center_bias': True
}

est = tf.estimator.BoostedTreesClassifier(feature_columns, **params)
# Train model.
est.train(train_input_fn, max_steps=100)

# Evaluation.
results = est.evaluate(eval_input_fn)
clear_output()
pd.Series(results).to_frame()

in_memory_params = dict(params)
in_memory_params['n_batches_per_layer'] = 1
print(results)


# In-memory input_fn does not use batching.
def make_inmemory_train_input_fn(X, y):
    y = np.expand_dims(y, axis=1)

    def input_fn():
        return dict(X), y

    return input_fn


train_input_fn = make_inmemory_train_input_fn(dftrain, y_train)

# Train the model.
est = tf.estimator.BoostedTreesClassifier(
    feature_columns,
    train_in_memory=True,
    **in_memory_params)

est.train(train_input_fn)
print(est.evaluate(eval_input_fn))
in_memory_params = dict(params)
in_memory_params['n_batches_per_layer'] = 1


# In-memory input_fn does not use batching.
def make_inmemory_train_input_fn(X, y):
    y = np.expand_dims(y, axis=1)

    def input_fn():
        return dict(X), y

    return input_fn


train_input_fn = make_inmemory_train_input_fn(dftrain, y_train)

# Train the model.
est = tf.estimator.BoostedTreesClassifier(
    feature_columns,
    train_in_memory=True,
    **in_memory_params)

est.train(train_input_fn)
print(est.evaluate(eval_input_fn))
pred_dicts = list(est.experimental_predict_with_explanations(eval_input_fn))

# Create DFC Pandas dataframe.
labels = y_eval.values
probs = pd.Series([pred['probabilities'][1] for pred in pred_dicts])
df_dfc = pd.DataFrame([pred['dfc'] for pred in pred_dicts])
df_dfc.describe().T

# Sum of DFCs + bias == probabality.
bias = pred_dicts[0]['bias']
dfc_prob = df_dfc.sum(axis=1) + bias
np.testing.assert_almost_equal(dfc_prob.values,
                               probs.values)


# Boilerplate code for plotting :)
def _get_color(value):
    """To make positive DFCs plot green, negative DFCs plot red."""
    green, red = sns.color_palette()[2:4]
    if value >= 0: return green
    return red


def _add_feature_values(feature_values, ax):
    """Display feature's values on left of plot."""
    x_coord = ax.get_xlim()[0]
    OFFSET = 0.15
    for y_coord, (feat_name, feat_val) in enumerate(feature_values.items()):
        t = plt.text(x_coord, y_coord - OFFSET, '{}'.format(feat_val), size=12)
        t.set_bbox(dict(facecolor='white', alpha=0.5))
    from matplotlib.font_manager import FontProperties
    font = FontProperties()
    font.set_weight('bold')
    t = plt.text(x_coord, y_coord + 1 - OFFSET, 'feature\nvalue',
                 fontproperties=font, size=12)


#
# def plot_example(example):
#     TOP_N = 8  # View top 8 features.
#     sorted_ix = example.abs().sort_values()[-TOP_N:].index  # Sort by magnitude.
#     example = example[sorted_ix]
#     colors = example.map(_get_color).tolist()
#     ax = example.to_frame().plot(kind='barh',
#                                  color=[colors],
#                                  legend=None,
#                                  alpha=0.75,
#                                  figsize=(10, 6))
#     ax.grid(False, axis='y')
#     ax.set_yticklabels(ax.get_yticklabels(), size=14)
#
#     # Add feature values.
#     _add_feature_values(dfeval.iloc[ID][sorted_ix], ax)
#     return ax


# Plot results.
# ID = 182
# example = df_dfc.iloc[ID]  # Choose ith example from evaluation set.
# TOP_N = 8  # View top 8 features.
# sorted_ix = example.abs().sort_values()[-TOP_N:].index
# ax = plot_example(example)
# ax.set_title('Feature contributions for example {}\n pred: {:1.2f}; label: {}'.format(ID, probs[ID], labels[ID]))
# ax.set_xlabel('Contribution to predicted probability', size=14)
# plt.show()
#

# Boilerplate plotting code.
# def dist_violin_plot(df_dfc, ID):
#     # Initialize plot.
#     fig, ax = plt.subplots(1, 1, figsize=(10, 6))
#
#     # Create example dataframe.
#     TOP_N = 8  # View top 8 features.
#     example = df_dfc.iloc[ID]
#     ix = example.abs().sort_values()[-TOP_N:].index
#     example = example[ix]
#     example_df = example.to_frame(name='dfc')
#
#     # Add contributions of entire distribution.
#     parts = ax.violinplot([df_dfc[w] for w in ix],
#                           vert=False,
#                           showextrema=False,
#                           widths=0.7,
#                           positions=np.arange(len(ix)))
#     face_color = sns_colors[0]
#     alpha = 0.15
#     for pc in parts['bodies']:
#         pc.set_facecolor(face_color)
#         pc.set_alpha(alpha)
#
#     # Add feature values.
#     _add_feature_values(dfeval.iloc[ID][sorted_ix], ax)
#
#     # Add local contributions.
#     ax.scatter(example,
#                np.arange(example.shape[0]),
#                color=sns.color_palette()[2],
#                s=100,
#                marker="s",
#                label='contributions for example')
#
#     # Legend
#     # Proxy plot, to show violinplot dist on legend.
#     ax.plot([0, 0], [1, 1], label='eval set contributions\ndistributions',
#             color=face_color, alpha=alpha, linewidth=10)
#     legend = ax.legend(loc='lower right', shadow=True, fontsize='x-large',
#                        frameon=True)
#     legend.get_frame().set_facecolor('white')
#
#     # Format plot.
#     ax.set_yticks(np.arange(example.shape[0]))
#     ax.set_yticklabels(example.index)
#     ax.grid(False, axis='y')
#     ax.set_xlabel('Contribution to predicted probability', size=14)
#

#
# dist_violin_plot(df_dfc, ID)
# plt.title('Feature contributions for example {}\n pred: {:1.2f}; label: {}'.format(ID, probs[ID], labels[ID]))
# plt.show()
#
# importances = est.experimental_feature_importances(normalize=True)
# df_imp = pd.Series(importances)
#
# # Visualize importances.
# N = 8
# ax = (df_imp.iloc[0:N][::-1]
#       .plot(kind='barh',
#             color=sns_colors[0],
#             title='Gain feature importances',
#             figsize=(10, 6)))
# ax.grid(False, axis='y')
#
# # Plot.
# dfc_mean = df_dfc.abs().mean()
# N = 8
# sorted_ix = dfc_mean.abs().sort_values()[-N:].index  # Average and sort by absolute.
# ax = dfc_mean[sorted_ix].plot(kind='barh',
#                               color=sns_colors[1],
#                               title='Mean |directional feature contributions|',
#                               figsize=(10, 6))
# ax.grid(False, axis='y')

# FEATURE = 'fare'
# feature = pd.Series(df_dfc[FEATURE].values, index=dfeval[FEATURE].values).sort_index()
# ax = sns.regplot(feature.index.values, feature.values, lowess=True)
# ax.set_ylabel('contribution')
# ax.set_xlabel(FEATURE)
# ax.set_xlim(0, 100)
# plt.show()


def permutation_importances(est, X_eval, y_eval, metric, features):
    """Column by column, shuffle values and observe effect on eval set.

    source: http://explained.ai/rf-importance/index.html
    A similar approach can be done during training. See "Drop-column importance"
    in the above article."""
    baseline = metric(est, X_eval, y_eval)
    imp = []
    for col in features:
        save = X_eval[col].copy()
        X_eval[col] = np.random.permutation(X_eval[col])
        m = metric(est, X_eval, y_eval)
        X_eval[col] = save
        imp.append(baseline - m)
    return np.array(imp)


def accuracy_metric(est, X, y):
    """TensorFlow estimator accuracy."""
    eval_input_fn = make_input_fn(X,
                                  y=y,
                                  shuffle=False,
                                  n_epochs=1)
    return est.evaluate(input_fn=eval_input_fn)['accuracy']


features = CATEGORICAL_COLUMNS + NUMERIC_COLUMNS
importances = permutation_importances(est, dfeval, y_eval, accuracy_metric,
                                      features)


def permutation_feature_importance():
    df_imp = pd.Series(importances, index=features)
    sorted_ix = df_imp.abs().sort_values().index
    print(sorted_ix)
    print(df_imp)
    print(importances)
    print(features)
    i = 0
    data = []

    for index, val in enumerate(importances):
        data.append({
            "feature": features[index],
            "value": str(abs(round(val, 3))),
            "valueColor": "rgb(255,255,255)"
        })
        i += 1
    final_data = {"data": data, "keys": ["value"]}
    return final_data
    # ax = df_imp[sorted_ix][-5:].plot(kind='barh', color=sns_colors[2], figsize=(10, 6))
    # ax.grid(False, axis='y')
    # ax.set_title('Permutation feature importance')
    # plt.show()


def get_results():
    i = 0
    data = []
    for key, val in results.items():
        data.append({
            "feature": key,
            "value": str(abs(round(val, 3))),
            "valueColor": "rgb(255,255,255)"
        })
        i += 1
    final_data = {"data": data, "keys": ["value"]}
    return final_data
    # ax = df_imp[sorted_ix][-5:].plot(kind='barh', color=sns_colors[2], figsize=(10, 6))
    # ax.grid(False, axis='y')
    # ax.set_title('Permutation feature importance')
    # plt.show()


def gen_shap(id):
    TOP_N = 8  # View top 8 features.
    ID = id
    example = df_dfc.iloc[ID]  # Choose ith example from evaluation set.
    sorted_ix = example.abs().sort_values()[-TOP_N:].index  # Sort by magnitude.
    example = example[sorted_ix]
    data = []
    colors = example.map(_get_color).tolist()
    i = 0
    for key, val in dict(example).items():
        col = tuple((int(x * 255)) for x in colors[i])
        print(col)
        data.append({
            "feature": key,
            "value": round(val, 3),
            "valueColor": "rgb" + str(col)
        })
        i += 1
    print(data)
    final_data = {"data": data, "keys": ["value"]}
    return final_data


def directional_feature_contribution(feature_name):
    FEATURE = feature_name
    feature = pd.Series(df_dfc[FEATURE].values, index=dfeval[FEATURE].values).sort_index()
    x_axis = feature.index.values
    print('converting x axis')
    if type(x_axis[0]) == str:
        unique_keys = np.unique(x_axis)
        print(unique_keys)
        unique_vals = range(1, len(unique_keys)+1)
        conversion = dict(zip(unique_keys, unique_vals))
        print(conversion)
        x_axis = [conversion[x] for x in x_axis]
    print(x_axis)
    y_axis = feature.values
    # ax = sns.regplot(feature.index.values, feature.values, lowess=True)
    # ax.set_ylabel('contribution')
    # ax.set_xlabel(FEATURE)
    # ax.set_xlim(0, 100)
    data = []
    for index, val in enumerate(x_axis):
        data.append({
            'x': val,
            'y': y_axis[index]
        })
    ret_data = [{
        'id': feature_name,
        'data': data
    }]
    return ret_data

def get_eval_nodes():
    vals=dfeval2.values.tolist()
    for i in range(len(vals)):
        vals[i].insert(0,i)
    keys=dfeval2.keys().tolist()
    keys.insert(0,"id")
    ret_data=[]
    for i in range(len(vals)):
        ret_data.append(dict(zip(keys,vals[i])))
    return ret_data